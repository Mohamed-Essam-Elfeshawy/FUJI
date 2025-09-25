// Bundle optimization utilities

// Tree-shakable imports for icons
export const importIcon = async (iconName) => {
  try {
    const module = await import(`@heroicons/react/24/outline/${iconName}`);
    return module.default;
  } catch (error) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }
};

// Dynamic imports for heavy components
export const loadComponent = (componentPath) => {
  return import(componentPath);
};

// Optimize i18n resources loading
export const loadTranslations = async (language) => {
  try {
    const translations = await import(`../locales/${language}/translation.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Translations for ${language} not found`);
    return {};
  }
};

// Remove unused CSS classes (for build optimization)
export const purgeUnusedCSS = () => {
  // This would be handled by build tools like PurgeCSS
  // Just a placeholder for documentation
  return true;
};

// Compress images on the fly
export const compressImage = (file, quality = 0.8, maxWidth = 1200) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Preload critical routes
export const preloadRoutes = () => {
  const criticalRoutes = ['/', '/shop', '/about'];
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

// Memory management for large datasets
export const chunkArray = (array, chunkSize = 10) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Virtual scrolling helper
export const getVisibleItems = (items, containerHeight, itemHeight, scrollTop) => {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  return {
    startIndex,
    endIndex,
    visibleItems: items.slice(startIndex, endIndex)
  };
};
