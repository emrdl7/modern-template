/**
 * Web Vitals 측정 모듈
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
  }
};
