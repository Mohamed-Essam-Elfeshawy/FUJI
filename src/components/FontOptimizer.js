import { useEffect } from 'react';

const FontOptimizer = () => {
  useEffect(() => {
    // Font loading optimization
    const optimizeFontLoading = () => {
      // Check if fonts are already loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }

      // Preload critical font weights
      const fontWeights = [400, 500, 600, 700];
      const fontFamily = 'Cairo';
      
      fontWeights.forEach(weight => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = `https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2`;
        document.head.appendChild(link);
      });

      // Add font-display: swap CSS
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Cairo';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
          unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
        }
        
        @font-face {
          font-family: 'Cairo';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
          unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
        }
        
        @font-face {
          font-family: 'Cairo';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
          unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
        }
        
        @font-face {
          font-family: 'Cairo';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
          unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
        }
        
        /* Fallback font stack */
        .font-loading {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        .fonts-loaded {
          font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        /* Optimize text rendering */
        body {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: "kern" 1;
        }
      `;
      document.head.appendChild(style);
    };

    // Font loading with timeout fallback
    const fontLoadingTimeout = setTimeout(() => {
      document.body.classList.add('fonts-loaded');
    }, 3000); // 3 second timeout

    // Initialize font optimization
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeFontLoading);
    } else {
      optimizeFontLoading();
    }

    // Cleanup
    return () => {
      clearTimeout(fontLoadingTimeout);
      document.removeEventListener('DOMContentLoaded', optimizeFontLoading);
    };
  }, []);

  return null; // This is a utility component, no UI
};

export default FontOptimizer;
