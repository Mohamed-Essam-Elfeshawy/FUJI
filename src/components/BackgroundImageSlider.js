import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const BackgroundImageSlider = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next');
  const isRTL = currentLanguageCode === 'ar';
  
  // Filter only elevator products for the background slider
  const elevatorProducts = PRODUCTS.filter(product => product.category === 'elevators');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % elevatorProducts.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, elevatorProducts.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + elevatorProducts.length) % elevatorProducts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % elevatorProducts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleShopNow = () => {
    window.location.href = '/shop';
  };

  if (elevatorProducts.length === 0) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {elevatorProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{
                backgroundImage: `url(${product.image})`,
                filter: 'brightness(0.7)',
              }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/70 to-midnight/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-midnight/60" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          {/* Main Content */}
          <div className="mb-12">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? (
                <>
                  حلول المصاعد<br />
                  <span className="text-electricBlue">المتطورة</span>
                </>
              ) : (
                <>
                  Premium Elevator<br />
                  <span className="text-electricBlue">Solutions</span>
                </>
              )}
            </h1>
            
            <p className={`text-xl md:text-2xl text-lightGray max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up ${isRTL ? 'font-cairo' : ''}`} style={{animationDelay: '0.3s'}}>
              {isRTL ? 
                'اكتشف مجموعتنا المتميزة من المصاعد عالية الجودة المصممة للمباني الحديثة والتطبيقات المتخصصة' :
                'Discover our premium collection of high-quality elevators designed for modern buildings and specialized applications'
              }
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <button
                onClick={handleShopNow}
                className={`inline-flex items-center px-12 py-6 bg-electricBlue hover:bg-electricBlueDark text-white text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-electricBlue/30 transform hover:scale-105 hover:-translate-y-1 ${isRTL ? 'font-cairo' : ''}`}
              >
                {isRTL ? 'تسوق الآن' : 'Shop Now'}
                <svg 
                  className={`w-6 h-6 ${isRTL ? 'mr-3' : 'ml-3'} transition-transform group-hover:translate-x-1`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M7 16l-4-4m0 0l4-4m-4 4h18" : "M17 8l4 4m0 0l-4 4m4-4H3"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Info Card */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-md">
              <h3 className={`text-2xl font-bold text-white mb-3 ${isRTL ? 'font-cairo' : ''}`}>
                {isRTL ? 
                  (elevatorProducts[currentSlide].id === 'elev-gearless-01' ? 'مصعد بدون تروس' :
                   elevatorProducts[currentSlide].id === 'elev-panorama-01' ? 'مصعد بانوراما' :
                   elevatorProducts[currentSlide].id === 'elev-gearbox-01' ? 'مصعد بتروس' :
                   elevatorProducts[currentSlide].name) 
                  : elevatorProducts[currentSlide].name
                }
              </h3>
              <p className={`text-lightGray leading-relaxed ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                {isRTL ? 
                  (elevatorProducts[currentSlide].id === 'elev-gearless-01' ? 'مصعد جر بدون تروس موفر للطاقة وقليل الضوضاء مثالي للمباني الحديثة.' :
                   elevatorProducts[currentSlide].id === 'elev-panorama-01' ? 'كابينة بانورامية بجدران زجاجية تجمع بين الجماليات والأداء.' :
                   elevatorProducts[currentSlide].id === 'elev-gearbox-01' ? 'جر موثوق مع صيانة سهلة، قيمة ممتازة للمباني السكنية.' :
                   elevatorProducts[currentSlide].description) 
                  : elevatorProducts[currentSlide].description
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={isRTL ? goToNext : goToPrevious}
        className={`absolute ${isRTL ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-electricBlue/20 hover:border-electricBlue/40 transition-all duration-300 group z-30`}
      >
        {isRTL ? 
          <ChevronRightIcon className="w-8 h-8 group-hover:text-electricBlue transition-colors duration-300" /> :
          <ChevronLeftIcon className="w-8 h-8 group-hover:text-electricBlue transition-colors duration-300" />
        }
      </button>
      
      <button
        onClick={isRTL ? goToPrevious : goToNext}
        className={`absolute ${isRTL ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-electricBlue/20 hover:border-electricBlue/40 transition-all duration-300 group z-30`}
      >
        {isRTL ? 
          <ChevronLeftIcon className="w-8 h-8 group-hover:text-electricBlue transition-colors duration-300" /> :
          <ChevronRightIcon className="w-8 h-8 group-hover:text-electricBlue transition-colors duration-300" />
        }
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {elevatorProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-electricBlue scale-125 shadow-lg shadow-electricBlue/50'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-8 right-8 z-30">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <div className={`w-3 h-3 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className={`text-white text-sm font-medium ${isRTL ? 'font-cairo' : ''}`}>
            {isAutoPlaying ? (isRTL ? 'تلقائي' : 'Auto') : (isRTL ? 'يدوي' : 'Manual')}
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-30 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className={`text-sm font-medium ${isRTL ? 'font-cairo' : ''}`}>
            {isRTL ? 'مرر للأسفل' : 'Scroll Down'}
          </span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default BackgroundImageSlider;
