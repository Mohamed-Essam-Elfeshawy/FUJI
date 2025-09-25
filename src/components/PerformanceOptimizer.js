import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Critical Resource Hints
    const addResourceHint = (href, rel, as = null, type = null) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    };

    // Preload critical images
    const criticalImages = [
      '/fuji-logo.jpg',
      '/images/hero-bg.jpg',
      '/images/products/elevator-1.jpg'
    ];

    criticalImages.forEach(img => {
      addResourceHint(img, 'preload', 'image');
    });

    // Prefetch next page resources
    const prefetchResources = [
      '/shop',
      '/about',
      '/contact'
    ];

    // Add prefetch after initial load
    setTimeout(() => {
      prefetchResources.forEach(resource => {
        addResourceHint(resource, 'prefetch');
      });
    }, 2000);

    // Optimize third-party scripts loading
    const loadThirdPartyScripts = () => {
      // Load non-critical scripts after page load
      const scripts = [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          async: true
        }
      ];

      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.async = script.async;
        document.head.appendChild(scriptElement);
      });
    };

    // Load third-party scripts after page is fully loaded
    if (document.readyState === 'complete') {
      loadThirdPartyScripts();
    } else {
      window.addEventListener('load', loadThirdPartyScripts);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', loadThirdPartyScripts);
    };
  }, []);

  return (
    <Helmet>
      {/* Critical CSS inlining hint */}
      <style type="text/css">{`
        /* Critical CSS for above-the-fold content */
        .hero-section { 
          background-color: #146FB6; 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
        }
        .navbar { 
          position: fixed; 
          top: 0; 
          width: 100%; 
          z-index: 1000; 
          background: rgba(255,255,255,0.95); 
          backdrop-filter: blur(10px); 
        }
        .loading-spinner { 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 50vh; 
        }
      `}</style>

      {/* Resource Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Module Preload for modern browsers */}
      <link rel="modulepreload" href="/static/js/main.js" />
      
      {/* Optimize viewport for performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Disable automatic telephone number detection */}
      <meta name="format-detection" content="telephone=no" />
      
      {/* Optimize rendering */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Performance hints for browsers */}
      <meta name="theme-color" content="#146FB6" />
      <meta name="color-scheme" content="light" />
    </Helmet>
  );
};

export default PerformanceOptimizer;
