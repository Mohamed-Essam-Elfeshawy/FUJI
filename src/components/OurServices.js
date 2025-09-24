import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Our_Services_Data } from '../components/Data'
import cookies from "js-cookie";

const OurServices = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';

    // Auto-play functionality with faster timing (3 seconds)
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % Our_Services_Data.length);
        }, 3000); // Faster than hero slider

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Touch handlers for swipe functionality
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && !isRTL) {
            goToNext();
        } else if (isRightSwipe && !isRTL) {
            goToPrevious();
        } else if (isLeftSwipe && isRTL) {
            goToPrevious();
        } else if (isRightSwipe && isRTL) {
            goToNext();
        }
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev - 1 + Our_Services_Data.length) % Our_Services_Data.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % Our_Services_Data.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-midnight">
            {/* Full-Width Background Slider */}
            <div className="absolute inset-0">
                {Our_Services_Data.map((service, index) => (
                    <div
                        key={service.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            index === activeIndex 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${service.img})`,
                                filter: 'brightness(0.4) contrast(1.1)',
                            }}
                        />
                        
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-midnight/90 via-midnight/70 to-midnight/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-transparent to-midnight/60" />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div 
                className="relative z-20 flex items-center justify-center min-h-screen px-6 lg:px-16"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="max-w-7xl mx-auto w-full">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                        
                        {/* Left Content */}
                        <div className={`${isRTL ? 'lg:col-start-2 text-right font-cairo' : 'text-left'} animate-fade-in-up`}>
                            <div className="mb-6">
                                <span className={`inline-block px-4 py-2 bg-brandRed/20 text-brandRed text-sm font-semibold rounded-full mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'خدماتنا' : 'Our Services'}
                                </span>
                            </div>
                            
                            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? Our_Services_Data[activeIndex].titleAR : Our_Services_Data[activeIndex].titleEN}
                            </h1>
                            
                            <p className={`text-xl text-lightGray leading-relaxed mb-8 max-w-lg ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? Our_Services_Data[activeIndex].descriptionAR : Our_Services_Data[activeIndex].descriptionEN}
                            </p>

                            {/* CTA Buttons */}
                            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                                <button
                                    onClick={() => window.location.href = '/shop'}
                                    className={`px-8 py-4 bg-brandRed hover:bg-red-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-brandRed/30 transform hover:scale-105 hover:-translate-y-1 ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {isRTL ? 'احصل على عرض سعر' : 'Get Quote'}
                                </button>
                                <button
                                    onClick={() => window.location.href = '/contact'}
                                    className={`px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {isRTL ? 'تعرف على المزيد' : 'Learn More'}
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Service Icon */}
                        <div className={`${isRTL ? 'lg:col-start-1' : ''} flex justify-center lg:justify-end animate-fade-in-up`} style={{animationDelay: '0.3s'}}>
                            <div className="relative">
                                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
                                    <img 
                                        className="w-16 h-16 lg:w-20 lg:h-20 filter brightness-0 invert" 
                                        src={Our_Services_Data[activeIndex].iconImg} 
                                        alt={Our_Services_Data[activeIndex].titleEN}
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brandRed/30 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brandBlue/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Navigation Controls */}
            
            {/* Arrow Navigation */}
            <button
                onClick={isRTL ? goToNext : goToPrevious}
                className={`absolute ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-brandRed/20 hover:border-brandRed/40 transition-all duration-300 group z-30`}
            >
                <svg className="w-6 h-6 group-hover:text-brandRed transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
            </button>
            
            <button
                onClick={isRTL ? goToPrevious : goToNext}
                className={`absolute ${isRTL ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-brandRed/20 hover:border-brandRed/40 transition-all duration-300 group z-30`}
            >
                <svg className="w-6 h-6 group-hover:text-brandRed transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {Our_Services_Data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === activeIndex
                                ? 'w-12 h-3 bg-brandRed shadow-lg shadow-brandRed/50'
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="absolute top-8 right-8 z-30">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className={`text-white text-xs font-medium ${isRTL ? 'font-cairo' : ''}`}>
                        {isAutoPlaying ? (isRTL ? 'تلقائي' : 'Auto') : (isRTL ? 'يدوي' : 'Manual')}
                    </span>
                </div>
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 md:hidden z-30">
                <div className={`text-white/70 text-sm text-center ${isRTL ? 'font-cairo' : ''}`}>
                    {isRTL ? 'اسحب للتنقل' : 'Swipe to navigate'}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
