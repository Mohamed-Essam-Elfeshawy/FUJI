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
    <div className="relative w-full bg-gradient-to-br from-midnight via-charcoal to-midnight overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-electricBlue/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-electricBlue/8 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-16">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? 'font-cairo' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
            {isRTL ? 'المنتجات المميزة' : 'Featured Products'}
          </h2>
          <p className="text-lightGray text-lg max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {isRTL ? 'اكتشف حلول المصاعد والخدمات المتميزة لدينا' : 'Discover our premium elevator solutions and services'}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div 
            ref={sliderRef}
            className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 h-full ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${isRTL ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? 'from-midnight/20 to-transparent' : 'from-transparent to-midnight/20'}`}></div>
                  </div>

                  {/* Product Info */}
                  <div className={`flex flex-col justify-center p-8 lg:p-12 text-white ${isRTL ? 'lg:col-start-1 text-right font-cairo' : 'text-left'}`}>
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-electricBlue/20 text-electricBlue text-sm font-semibold rounded-full mb-4 capitalize">
                        {isRTL ? 
                          (product.category === 'elevators' ? 'مصاعد' : 
                           product.category === 'spare_parts' ? 'قطع غيار' : 
                           product.category === 'services' ? 'خدمات' : product.category) 
                          : product.category.replace('_', ' ')
                        }
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                      {isRTL ? 
                        (product.id === 'elev-gearless-01' ? 'مصعد بدون تروس' :
                         product.id === 'elev-panorama-01' ? 'مصعد بانوراما' :
                         product.id === 'elev-gearbox-01' ? 'مصعد بتروس' :
                         product.id === 'part-buttons-01' ? 'مجموعة أزرار لمسية' :
                         product.id === 'service-maintenance-01' ? 'خطة الصيانة السنوية' :
                         product.name) 
                        : product.name
                      }
                    </h3>
                    
                    <p className="text-lightGray text-lg leading-relaxed mb-8 max-w-lg">
                      {isRTL ? 
                        (product.id === 'elev-gearless-01' ? 'مصعد جر بدون تروس موفر للطاقة وقليل الضوضاء مثالي للمباني الحديثة.' :
                         product.id === 'elev-panorama-01' ? 'كابينة بانورامية بجدران زجاجية تجمع بين الجماليات والأداء.' :
                         product.id === 'elev-gearbox-01' ? 'جر موثوق مع صيانة سهلة، قيمة ممتازة للمباني السكنية.' :
                         product.id === 'part-buttons-01' ? 'مجموعة أزرار لمسية متينة ومضيئة للكابينات والطوابق.' :
                         product.id === 'service-maintenance-01' ? 'خطة صيانة وقائية لمدة 12 شهرًا مع دعم أولوية وفحوصات أمان.' :
                         product.description) 
                        : product.description
                      }
                    </p>
                    
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-4xl font-bold text-electricBlue">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => handleShopNow(product.id)}
                        className={`px-8 py-4 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'تسوق الآن' : 'Shop Now'}
                      </button>
                      <button
                        onClick={() => window.location.href = '/shop'}
                        className={`px-8 py-4 bg-white/5 backdrop-blur-md border border-electricBlue/30 text-electricBlue text-lg font-semibold rounded-2xl hover:bg-electricBlue/10 hover:border-electricBlue/50 transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
                      >
                        {isRTL ? 'عرض جميع المنتجات' : 'View All Products'}
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
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-electricBlue/20 hover:border-electricBlue/40 transition-all duration-300 group z-10`}
          >
            {isRTL ? 
              <ChevronRightIcon className="w-6 h-6 group-hover:text-electricBlue transition-colors duration-300" /> :
              <ChevronLeftIcon className="w-6 h-6 group-hover:text-electricBlue transition-colors duration-300" />
            }
          </button>
          
          <button
            onClick={isRTL ? goToPrevious : goToNext}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-electricBlue/20 hover:border-electricBlue/40 transition-all duration-300 group z-10`}
          >
            {isRTL ? 
              <ChevronLeftIcon className="w-6 h-6 group-hover:text-electricBlue transition-colors duration-300" /> :
              <ChevronRightIcon className="w-6 h-6 group-hover:text-electricBlue transition-colors duration-300" />
            }
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-3">
            {PRODUCTS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-electricBlue scale-125 shadow-lg shadow-electricBlue/50'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-white text-xs font-medium">
                {isAutoPlaying ? 'Auto' : 'Manual'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile-specific improvements */}
        <div className="block lg:hidden mt-8">
          <div className="text-center">
            <p className={`text-lightGray text-sm mb-4 ${isRTL ? 'font-cairo' : ''}`}>
              {isRTL ? 'اسحب يسارًا أو يمينًا لتصفح المنتجات' : 'Swipe left or right to browse products'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
