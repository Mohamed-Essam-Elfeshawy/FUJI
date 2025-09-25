// CSS Optimization utilities for FUJI FD

// Critical CSS extractor
export const extractCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #ffffff;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #146FB6 0%, #1e40af 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(20, 111, 182, 0.1);
      transition: all 0.3s ease;
    }
    
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #146FB6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* RTL Support */
    [dir="rtl"] {
      text-align: right;
    }
    
    [dir="rtl"] .navbar {
      direction: rtl;
    }
    
    /* Mobile First Responsive */
    @media (max-width: 768px) {
      .hero-section {
        padding: 1rem;
        text-align: center;
      }
      
      .navbar {
        padding: 0.5rem 1rem;
      }
    }
  `;
  
  return criticalCSS;
};

// Remove unused CSS classes
export const removeUnusedCSS = (css, usedClasses) => {
  const lines = css.split('\n');
  const cleanedLines = [];
  let inUnusedRule = false;
  let braceCount = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if this is a CSS rule
    if (trimmedLine.includes('{')) {
      const selector = trimmedLine.split('{')[0].trim();
      const isUsed = usedClasses.some(className => 
        selector.includes(className) || 
        selector.includes('*') || 
        selector.includes('body') ||
        selector.includes('html')
      );
      
      if (!isUsed) {
        inUnusedRule = true;
        braceCount = 1;
        continue;
      }
    }
    
    if (inUnusedRule) {
      if (trimmedLine.includes('{')) braceCount++;
      if (trimmedLine.includes('}')) braceCount--;
      
      if (braceCount === 0) {
        inUnusedRule = false;
      }
      continue;
    }
    
    cleanedLines.push(line);
  }
  
  return cleanedLines.join('\n');
};

// Minify CSS
export const minifyCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
    .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
    .replace(/;\s*/g, ';') // Remove spaces after semicolon
    .replace(/,\s*/g, ',') // Remove spaces after comma
    .replace(/:\s*/g, ':') // Remove spaces after colon
    .trim();
};

// Generate CSS custom properties for theme colors
export const generateCSSCustomProperties = () => {
  return `
    :root {
      --fuji-blue: #146FB6;
      --fuji-accent: #E21E26;
      --fuji-surface: #F5F7FA;
      --fuji-muted: #6B7280;
      --fuji-bg: #FFFFFF;
      --fuji-text: #1F2937;
      --fuji-border: #E5E7EB;
      --fuji-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      --fuji-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      --fuji-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --fuji-font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :root {
        --fuji-bg: #1F2937;
        --fuji-text: #F9FAFB;
        --fuji-surface: #374151;
        --fuji-border: #4B5563;
      }
    }
  `;
};

// Optimize font loading CSS
export const generateFontLoadingCSS = () => {
  return `
    /* Font Loading Optimization */
    @font-face {
      font-family: 'Cairo';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local('Cairo'), url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
      unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
    }
    
    @font-face {
      font-family: 'Cairo';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: local('Cairo Medium'), url('https://fonts.gstatic.com/s/cairo/v17/SLXgc1nY6HkvalIkTp2mxdt0UX8.woff2') format('woff2');
      unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
    }
    
    /* Font loading fallback */
    .font-loading {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    
    .font-loaded {
      font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
  `;
};

// CSS performance utilities
export const cssPerformanceUtils = {
  // Add will-change property for animations
  addWillChange: (selector, properties) => {
    return `${selector} { will-change: ${properties.join(', ')}; }`;
  },
  
  // Generate container queries for responsive design
  generateContainerQueries: () => {
    return `
      .container {
        container-type: inline-size;
      }
      
      @container (min-width: 768px) {
        .responsive-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @container (min-width: 1024px) {
        .responsive-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `;
  },
  
  // Generate CSS for reduced motion
  generateReducedMotion: () => {
    return `
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
  }
};

export default {
  extractCriticalCSS,
  removeUnusedCSS,
  minifyCSS,
  generateCSSCustomProperties,
  generateFontLoadingCSS,
  cssPerformanceUtils
};
