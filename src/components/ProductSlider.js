import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const ProductSlider = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % PRODUCTS.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch/Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleShopNow = (productId) => {
    // Navigate to shop page with product focus
    window.location.href = `/shop#${productId}`;
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-fuji-blue/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-fuji-accent/15 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-16">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isRTL ? 'font-cairo' : ''}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-fuji-blue mb-3 animate-fade-in-up">
            {isRTL ? 'منتجاتنا المميزة' : 'Our Products'}
          </h2>
          <p className="text-fuji-muted text-base max-w-xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {isRTL ? 'حلول مصاعد متطورة وموثوقة' : 'Advanced & reliable elevator solutions'}
          </p>
        </div>
        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div 
            ref={sliderRef}
            className="relative h-[560px] md:h-[640px] lg:h-[700px] rounded-3xl overflow-hidden bg-fuji-surface border border-fuji-blue shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 h-full ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Left Column - Product Image */}
                  <div className={`relative overflow-hidden ${isRTL ? 'lg:col-start-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-fuji-blue/20 to-fuji-accent/10"></div>
                    <img 
                      src={product.image} 
                      alt={isRTL ? product.nameAR : product.nameEN}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-fuji-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {isRTL ? 'مصعد متميز' : 'Premium Elevator'}
                    </div>
                  </div>

                  {/* Right Column - Product Info */}
                  <div className={`flex flex-col justify-center p-6 lg:p-10 bg-white/95 backdrop-blur-sm text-center ${isRTL ? 'md:text-right lg:col-start-1' : 'md:text-left'}`}>
                    <h3 className={`text-2xl lg:text-3xl font-bold text-fuji-blue mb-3 ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.nameAR : product.nameEN}
                    </h3>
                    
                    <p className={`text-base text-fuji-muted mb-6 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.descriptionAR : product.descriptionEN}
                    </p>

                    {/* Price Display */}
                    <div className={`mb-5 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`flex items-center gap-1 leading-none text-2xl lg:text-3xl font-bold text-fuji-blue justify-center mb-[5px] ${isRTL ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span>{product.price.toLocaleString()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 428" className="w-5 h-5 translate-y-[1px]">
                          <path d="M223.564 62.2622C239.654 44.2002 249.543 36.0911 268.965 25.839V326.607L223.564 335.988V62.2622Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 213.474C378.039 193.607 379.147 184.777 381.667 164.396L33.6534 239.963C25.4006 258.346 22.7442 268.622 21.4724 286.872L368.627 213.474Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 305.598C378.039 285.73 379.147 276.9 381.667 256.52L225.225 289.632C224.118 307.843 225.389 317.186 224.118 335.436L368.627 305.598Z" fill="rgb(20,111,182)"/>
                          <path d="M368.627 397.708C378.039 377.841 379.147 369.011 381.667 348.63L239.067 379.586C231.869 389.519 227.44 406.075 224.118 427.547L368.627 397.708Z" fill="rgb(20,111,182)"/>
                          <path d="M142.174 366.341C156.016 349.233 170.411 327.71 180.377 310.051L12.514 346.435C4.26132 364.818 1.60486 375.094 0.333069 393.344L142.174 366.341Z" fill="rgb(20,111,182)"/>
                          <path d="M134.976 36.8764C151.067 18.8143 160.955 10.7052 180.377 0.453125V311.154L134.976 320.536V36.8764Z" fill="rgb(20,111,182)"/>
                        </svg>
                      </div>
                      <p className={`text-xs text-gray-600 mt-1 ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL ? 'شامل التركيب والضمان' : 'Including installation & warranty'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className={`grid grid-cols-2 gap-3 text-sm ${isRTL ? 'font-cairo' : ''}`}>
                        {[
                          isRTL ? 'تقنية متطورة' : 'Advanced Tech',
                          isRTL ? 'موفر للطاقة' : 'Energy Efficient',
                          isRTL ? 'تصميم عصري' : 'Modern Design',
                          isRTL ? 'صيانة سهلة' : 'Easy Maintenance'
                        ].map((spec, specIndex) => (
                          <div key={specIndex} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-1.5 h-1.5 bg-fuji-accent rounded-full flex-shrink-0"></div>
                            <span className={`text-fuji-muted ${isRTL ? 'text-right' : ''}`}>
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => window.location.href = '/shop'}
                        className={`w-full sm:w-auto px-6 py-3 bg-fuji-accent hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'تسوق الآن' : 'Shop Now'}
                      </button>
                      <button
                        onClick={() => window.location.href = '/contact'}
                        className={`w-full sm:w-auto px-6 py-3 bg-white border-2 border-fuji-blue text-fuji-blue hover:bg-fuji-blue hover:text-white font-semibold rounded-xl transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'المزيد' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={isRTL ? goToNext : goToPrevious}
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center justify-center text-fuji-blue hover:text-fuji-accent transition-colors duration-200 z-10`}
            aria-label={isRTL ? 'Next slide' : 'Previous slide'}
          >
            {isRTL ? 
              <ChevronRightIcon className="w-8 h-8 drop-shadow" strokeWidth={2.5} /> :
              <ChevronLeftIcon className="w-8 h-8 drop-shadow" strokeWidth={2.5} />
            }
          </button>
          
          <button
            onClick={isRTL ? goToPrevious : goToNext}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 flex items-center justify-center text-fuji-blue hover:text-fuji-accent transition-colors duration-200 z-10`}
            aria-label={isRTL ? 'Previous slide' : 'Next slide'}
          >
            {isRTL ? 
              <ChevronLeftIcon className="w-8 h-8 drop-shadow" strokeWidth={2.5} /> :
              <ChevronRightIcon className="w-8 h-8 drop-shadow" strokeWidth={2.5} />
            }
          </button>


          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-fuji-blue shadow-md">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-fuji-muted text-xs font-medium">
                {isAutoPlaying ? 'Auto' : 'Manual'}
              </span>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            {PRODUCTS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === currentSlide 
                    ? 'bg-fuji-blue border-fuji-blue scale-125 shadow-lg' 
                    : 'bg-white border-white/70 hover:bg-fuji-blue/80 hover:border-fuji-blue hover:scale-110 shadow-md'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile-specific improvements */}
        <div className="block lg:hidden mt-8">
          <div className="text-center">
            <p className={`text-fuji-muted text-sm mb-4 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'اسحب يسارًا أو يمينًا لتصفح المنتجات' : 'Swipe left or right to browse products'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
