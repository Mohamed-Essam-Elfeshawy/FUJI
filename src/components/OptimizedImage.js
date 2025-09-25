import React, { useState, useRef, useEffect, memo } from 'react';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  quality = 80,
  placeholder = null,
  lazy = true,
  webp = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef();

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // If WebP is supported and enabled, try to use WebP version
    if (webp && supportsWebP()) {
      const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return webpSrc;
    }
    
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Set image source when in view
  useEffect(() => {
    if (isInView && src) {
      setImageSrc(getOptimizedSrc(src));
    }
  }, [isInView, src, webp]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Fallback to original format if WebP fails
    if (webp && imageSrc.includes('.webp')) {
      setImageSrc(src);
    } else {
      setHasError(true);
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const ext = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${ext}`, '');
    
    return [
      `${baseName}_400w.${ext} 400w`,
      `${baseName}_800w.${ext} 800w`,
      `${baseName}_1200w.${ext} 1200w`,
      `${baseName}_1600w.${ext} 1600w`
    ].join(', ');
  };

  const generateSizes = () => {
    return '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px';
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`} 
      style={{ width, height }}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder || (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-2 border-fuji-blue border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-gray-500">جاري التحميل...</span>
            </div>
          )}
        </div>
      )}

      {/* Optimized Image */}
      {isInView && imageSrc && !hasError && (
        <picture>
          {/* WebP source for supported browsers */}
          {webp && (
            <source 
              srcSet={generateSrcSet(imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp'))}
              sizes={generateSizes()}
              type="image/webp" 
            />
          )}
          
          {/* Fallback source */}
          <source 
            srcSet={generateSrcSet(src)}
            sizes={generateSizes()}
            type={`image/${src.split('.').pop()}`} 
          />
          
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </picture>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xs">فشل في تحميل الصورة</p>
          </div>
        </div>
      )}

      {/* Loading indicator overlay */}
      {isInView && imageSrc && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
