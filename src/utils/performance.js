// Performance utilities for the FUJI website

// Debounce function for search and scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image optimization helper
export const getOptimizedImageUrl = (url, width = 800, quality = 80) => {
  // For future implementation with image optimization service
  return url;
};

// Preload critical resources
export const preloadResource = (href, as, type = null, crossorigin = false) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (crossorigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Lazy load non-critical CSS
export const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = function() {
    this.media = 'all';
  };
  document.head.appendChild(link);
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Performance monitoring
export const measurePerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart);
        console.log('First Paint:', performance.getEntriesByType('paint')[0]?.startTime);
      }, 0);
    });
  }
};

// Memory cleanup for components
export const cleanupComponent = (refs = [], intervals = [], timeouts = []) => {
  return () => {
    refs.forEach(ref => {
      if (ref.current) {
        ref.current = null;
      }
    });
    
    intervals.forEach(interval => clearInterval(interval));
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
};
