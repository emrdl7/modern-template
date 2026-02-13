/**
 * Web Vitals 측정 모듈
<<<<<<< HEAD
 * LCP (Largest Contentful Paint) 및 CLS (Cumulative Layout Shift) 측정
 * PerformanceObserver API 사용
 */

export const initWebVitals = () => {
  // 브라우저 지원 여부 확인
  if (!('PerformanceObserver' in window)) {
    console.warn('[Web Vitals] PerformanceObserver not supported.');
    return;
  }

  // LCP 측정
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      console.log(`[Web Vitals] LCP: ${lastEntry.startTime.toFixed(2)}ms`, lastEntry);
      
      // LCP 요소 하이라이트 (디버깅용, 실제 프로덕션에서는 제거하거나 옵션으로)
      if (lastEntry.element) {
        // console.log('[Web Vitals] LCP Element:', lastEntry.element);
        // lastEntry.element.style.border = '2px dashed red';
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('[Web Vitals] LCP measurement failed:', e);
  }

  // CLS 측정
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log(`[Web Vitals] CLS updated: ${clsValue.toFixed(4)}`, entry);
        }
      }
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('[Web Vitals] CLS measurement failed:', e);
  }

  // FID/INP 대용: First Paint / Contentful Paint (참고용)
  try {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log(`[Web Vitals] ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // ignore
=======
 * LCP, FID, CLS 등 핵심 웹 지표를 측정하여 콘솔이나 분석 도구로 전송합니다.
 */

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function sendToAnalytics(metric) {
  // 개발 환경에서는 콘솔에 출력
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
    return;
  }

  // 실제 배포 환경에서는 분석 서버로 전송 (예시: navigator.sendBeacon)
  const body = JSON.stringify(metric);
  // 예: navigator.sendBeacon('/analytics', body);
  // console.log('[Web Vitals] Sent to analytics', metric);
}

export const initWebVitals = () => {
  try {
    // Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          sendToAnalytics({
            name: 'CLS',
            value: entry.value,
            delta: entry.value,
            id: entry.id || `v-${Date.now()}`
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        sendToAnalytics({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          delta: entry.processingStart - entry.startTime,
          id: entry.id || `v-${Date.now()}`
        });
      }
    }).observe({ type: 'first-input', buffered: true });

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        sendToAnalytics({
          name: 'LCP',
          value: entry.startTime,
          delta: entry.startTime,
          id: entry.id || `v-${Date.now()}`
        });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    console.log('Web Vitals monitoring initialized.');
  } catch (e) {
    console.warn('Web Vitals are not supported in this browser.', e);
>>>>>>> 2be1912 (feat: Web Vitals 측정 스크립트 실제 반영 (누락분 추가))
  }
};
