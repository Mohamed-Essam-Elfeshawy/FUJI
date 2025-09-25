import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import RiyalSymbol from './RiyalSymbol';

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
            className="relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden bg-fuji-surface border border-fuji-blue shadow-2xl"
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
                  <div className={`flex flex-col justify-center p-6 lg:p-10 bg-white/95 backdrop-blur-sm ${isRTL ? 'lg:col-start-1 text-right' : 'text-left'}`}>
                    <h3 className={`text-2xl lg:text-3xl font-bold text-fuji-blue mb-3 ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.nameAR : product.nameEN}
                    </h3>
                    
                    <p className={`text-base text-fuji-muted mb-6 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                      {isRTL ? product.descriptionAR : product.descriptionEN}
                    </p>

                    {/* Price Display */}
                    <div className={`mb-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 text-2xl lg:text-3xl font-bold text-fuji-blue ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        {isRTL ? (
                          <>
                            <span>{product.price.toLocaleString()}</span>
                            <RiyalSymbol className="w-6 h-6 lg:w-8 lg:h-8" />
                          </>
                        ) : (
                          <>
                            <RiyalSymbol className="w-6 h-6 lg:w-8 lg:h-8" />
                            <span>{product.price.toLocaleString()}</span>
                          </>
                        )}
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
                        className={`px-6 py-3 bg-fuji-accent hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'تسوق الآن' : 'Shop Now'}
                      </button>
                      <button
                        onClick={() => window.location.href = '/contact'}
                        className={`px-6 py-3 bg-white border-2 border-fuji-blue text-fuji-blue hover:bg-fuji-blue hover:text-white font-semibold rounded-xl transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
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
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-fuji-blue rounded-full flex items-center justify-center text-fuji-blue hover:bg-fuji-blue hover:text-white hover:border-fuji-blue transition-all duration-300 group z-10 shadow-lg`}
          >
            {isRTL ? 
              <ChevronRightIcon className="w-6 h-6 transition-colors duration-300" /> :
              <ChevronLeftIcon className="w-6 h-6 transition-colors duration-300" />
            }
          </button>
          
          <button
            onClick={isRTL ? goToPrevious : goToNext}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-fuji-blue rounded-full flex items-center justify-center text-fuji-blue hover:bg-fuji-blue hover:text-white hover:border-fuji-blue transition-all duration-300 group z-10 shadow-lg`}
          >
            {isRTL ? 
              <ChevronLeftIcon className="w-6 h-6 transition-colors duration-300" /> :
              <ChevronRightIcon className="w-6 h-6 transition-colors duration-300" />
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
