/**
 * Lightweight performance metrics (LCP/CLS + INP + action→paint delay)
 *
 * 목표:
 * - 운영에 부담이 없는 최소 계측
 * - 표준 API가 없는 브라우저는 자동 skip
 * - 강제 전송 없이 console + 커스텀 이벤트로 확장 여지 제공
 */

const PERF_EVENT_NAME = 'app:perf-metric';

const emitMetric = (name, value, extra = {}) => {
  const payload = {
    name,
    value,
    ts: Date.now(),
    path: window.location.pathname,
    ...extra,
  };

  // eslint-disable-next-line no-console
  console.info('[perf]', payload);

  window.dispatchEvent(
    new CustomEvent(PERF_EVENT_NAME, {
      detail: payload,
    }),
  );
};

const initLcpObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (!last) return;
      emitMetric('LCP', Number(last.startTime.toFixed(1)));
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'hidden') observer.disconnect();
      },
      { once: true },
    );
  } catch (_error) {
    // 지원하지 않는 브라우저는 조용히 skip
  }
};

const initClsObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  let cls = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) cls += entry.value;
      });
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    const flushCls = () => {
      emitMetric('CLS', Number(cls.toFixed(4)));
      observer.disconnect();
    };

    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState !== 'hidden') return;
        flushCls();
      },
      { once: true },
    );

    window.addEventListener('pagehide', flushCls, { once: true });
  } catch (_error) {
    // 지원하지 않는 브라우저는 조용히 skip
  }
};

const initInpObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  let maxInp = 0;
  let maxInteractionId = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // interactionId가 0이면 사용자 상호작용 INP 후보가 아님
        if (!entry.interactionId) return;

        const candidate = entry.duration || 0;
        if (candidate > maxInp) {
          maxInp = candidate;
          maxInteractionId = entry.interactionId;
        }
      });
    });

    // INP는 이벤트 타이밍 API 지원 브라우저에서만 동작
    observer.observe({ type: 'event', buffered: true, durationThreshold: 40 });

    const flushInp = () => {
      if (maxInp > 0) {
        emitMetric('INP', Number(maxInp.toFixed(1)), {
          interactionId: maxInteractionId,
        });
      }
      observer.disconnect();
    };

    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState !== 'hidden') return;
        flushInp();
      },
      { once: true },
    );

    window.addEventListener('pagehide', flushInp, { once: true });
  } catch (_error) {
    // 지원하지 않는 브라우저는 조용히 skip
  }
};

const initActionToPaintDelay = () => {
  if (!('requestAnimationFrame' in window)) return;

  let lastMeasuredAt = 0;
  const MIN_INTERVAL_MS = 700;

  const handler = (event) => {
    const startedAt = performance.now();

    if (startedAt - lastMeasuredAt < MIN_INTERVAL_MS) return;
    lastMeasuredAt = startedAt;

    // 2 프레임 뒤 측정으로 실제 페인트 반영 시점에 가깝게 근사
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const delay = performance.now() - startedAt;
        const target = event.target;
        const targetName = target instanceof Element ? target.tagName.toLowerCase() : 'unknown';

        const extra = {
          trigger: event.type,
          target: targetName,
        };

        if (event.type === 'keydown' && 'key' in event) {
          extra.key = event.key;
        }

        emitMetric('ACTION_TO_PAINT', Number(delay.toFixed(1)), extra);
      });
    });
  };

  ['click', 'pointerup', 'keydown'].forEach((type) => {
    document.addEventListener(type, handler, { passive: true, capture: true });
  });
};

export const initPerfMetrics = () => {
  // 로컬/개발 환경에서만 계측하고 싶을 때를 위한 쉬운 옵트아웃
  if (document.documentElement.dataset.perfMetrics === 'off') return;

  emitMetric('PERF_CAPABILITY', 1, {
    supportsEventTiming: 'PerformanceObserver' in window,
    supportsPointerEvent: 'PointerEvent' in window,
  });

  initLcpObserver();
  initClsObserver();
  initInpObserver();
  initActionToPaintDelay();
};
