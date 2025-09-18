import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import MultilineText from './MultilineText';
import { PRODUCTS } from '../data/products';

const Hero = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    
    // Filter only elevator products for the background slider
    const elevatorProducts = PRODUCTS.filter(product => product.category === 'elevators');
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Auto-play functionality for background images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % elevatorProducts.length);
        }, 5000); // Change background every 5 seconds

        return () => clearInterval(interval);
    }, [elevatorProducts.length]);
    
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Mobile */}
            <div className="block md:hidden relative h-screen overflow-hidden">
                {/* Background Image Slider */}
                <div className="absolute inset-0">
                    {elevatorProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                    filter: 'brightness(0.9) contrast(1.2) saturate(1.1)',
                                }}
                            />
                        </div>
                    ))}
                    {/* Lighter gradient overlay for more visible images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight/60 via-midnight/40 to-midnight/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-midnight/30" />
                </div>

                <Navbar />

                <div className='relative z-20 px-6 pt-20'>
                    {/* Modern hero content with glassmorphism */}
                    <div className="flex flex-col justify-center min-h-[calc(100vh-120px)]">
                        <div className="text-center">
                            <h1 className={`text-white text-4xl font-bold leading-tight mb-6 tracking-tight animate-fade-in-up ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                                {isRTL ? (
                                    <>
                                        نرتقي إلى آفاق جديدة،<br />
                                        <span className="text-electricBlue">بأمان وسرعة</span>
                                    </>
                                ) : (
                                    <>
                                        Rising To New Heights,<br />
                                        <span className="text-electricBlue">Safely & Swiftly</span>
                                    </>
                                )}
                            </h1>

                            <p className={`text-lightGray text-base font-normal leading-relaxed mb-10 max-w-md mx-auto animate-fade-in-up ${isRTL ? 'font-cairo text-right' : 'text-left'}`} style={{animationDelay: '0.2s'}}>
                                {isRTL ? 
                                    'نقدم حلولاً تكنولوجية متطورة تمكن الشركات من الوصول إلى آفاق جديدة بأمان وسرعة لا مثيل لهما.' :
                                    'We provide cutting-edge technological solutions that empower businesses to scale new heights with unparalleled safety and swiftness.'
                                }
                            </p>

                            {/* Modern CTA buttons with glassmorphism */}
                            <div className={`flex flex-col gap-4 animate-fade-in-up ${isRTL ? 'items-end' : 'items-start'}`} style={{animationDelay: '0.4s'}}>
                                <button
                                    onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
                                </button>
                                <button
                                    onClick={() => scrollToSection('ourServices')}
                                    className={`py-4 px-8 bg-white/5 backdrop-blur-md border border-electricBlue/30 text-electricBlue text-lg font-semibold rounded-2xl hover:bg-electricBlue/10 hover:border-electricBlue/50 transition-all duration-300 shadow-soft ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'خدماتنا' : 'Our Services'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Desktop */}
            <div className="hidden md:block relative h-screen overflow-hidden">
                {/* Background Image Slider */}
                <div className="absolute inset-0">
                    {elevatorProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                    filter: 'brightness(0.9) contrast(1.2) saturate(1.1)',
                                }}
                            />
                        </div>
                    ))}
                    {/* Lighter gradient overlay for more visible images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight/60 via-midnight/40 to-midnight/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-midnight/30" />
                </div>

                <Navbar />

                <div className='relative z-20 max-w-7xl mx-auto px-8 lg:px-16'>
                    {/* Modern hero content with glassmorphism */}
                    <div className="flex items-center min-h-[calc(100vh-120px)]">
                        <div className="max-w-4xl pt-20">
                            <h1 className={`text-white text-4xl font-bold leading-tight mb-6 tracking-tight animate-fade-in-up ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                                {isRTL ? (
                                    <>
                                        نرتقي إلى آفاق جديدة،<br />
                                        <span className="text-electricBlue">بأمان وسرعة</span>
                                    </>
                                ) : (
                                    <>
                                        Rising To New Heights,<br />
                                        <span className="text-electricBlue">Safely & Swiftly</span>
                                    </>
                                )}
                            </h1>

                            <p className={`text-lightGray text-base font-normal leading-relaxed mb-10 max-w-md mx-auto animate-fade-in-up ${isRTL ? 'font-cairo text-right' : 'text-left'}`} style={{animationDelay: '0.2s'}}>
                                {isRTL ? 
                                    'نقدم حلولاً تكنولوجية متطورة تمكن الشركات من الوصول إلى آفاق جديدة بأمان وسرعة لا مثيل لهما.' :
                                    'We provide cutting-edge technological solutions that empower businesses to scale new heights with unparalleled safety and swiftness.'
                                }
                            </p>

                            {/* Modern CTA buttons with glassmorphism */}
                            <div className={`flex flex-col gap-4 animate-fade-in-up ${isRTL ? 'items-end' : 'items-start'}`} style={{animationDelay: '0.4s'}}>
                                <button
                                    onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
                                </button>
                                <button
                                    onClick={() => scrollToSection('ourServices')}
                                    className={`py-4 px-8 bg-white/5 backdrop-blur-md border border-electricBlue/30 text-electricBlue text-lg font-semibold rounded-2xl hover:bg-electricBlue/10 hover:border-electricBlue/50 transition-all duration-300 shadow-soft ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'خدماتنا' : 'Our Services'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Hero