import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import MultilineText from './MultilineText';

// Import new hero background images
import heroImage1 from '../images/Hero/44.jpg';
import heroImage2 from '../images/Hero/55.jpg';
import heroImage3 from '../images/Hero/66.jpg';
import heroImage4 from '../images/Hero/77.jpg';
import heroImage5 from '../images/Hero/88.jpg';

const Hero = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    
    // New hero background images array
    const heroImages = [
        { id: 1, image: heroImage1, alt: 'Hero Background 1' },
        { id: 2, image: heroImage2, alt: 'Hero Background 2' },
        { id: 3, image: heroImage3, alt: 'Hero Background 3' },
        { id: 4, image: heroImage4, alt: 'Hero Background 4' },
        { id: 5, image: heroImage5, alt: 'Hero Background 5' }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Auto-play functionality for background images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000); // Change background every 4 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);
    
    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Mobile */}
            <div className="block md:hidden relative h-screen min-h-[600px] max-h-[800px] overflow-hidden">
                {/* Background Image Slider */}
                <div className="absolute inset-0">
                    {heroImages.map((heroImg, index) => (
                        <div
                            key={heroImg.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                                style={{
                                    backgroundImage: `url(${heroImg.image})`,
                                    filter: 'brightness(0.8) contrast(1.4) saturate(1.3) blur(0px)',
                                    imageRendering: 'crisp-edges',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        </div>
                    ))}
                    {/* Enhanced gradient overlay for better image quality */}
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight/50 via-midnight/30 to-midnight/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/20" />
                </div>

                <Navbar />

                <div className='relative z-20 px-4 sm:px-6 pt-16 sm:pt-20'>
                    {/* Modern hero content with glassmorphism */}
                    <div className="flex flex-col justify-center min-h-screen sm:min-h-screen -translate-y-6 sm:-translate-y-8">
                        <div className="text-center">
                            <h1 className={`text-white text-3xl sm:text-4xl font-bold leading-tight mb-4 sm:mb-6 tracking-tight animate-fade-in-up drop-shadow-lg ${isRTL ? 'font-cairo text-center' : 'text-center'}`}>
                                {isRTL ? (
                                    <>
                                        نرتقي إلى آفاق جديدة،<br />
                                        <span className="text-white font-extrabold drop-shadow-xl">بأمان وسرعة</span>
                                    </>
                                ) : (
                                    <>
                                        Rising To New Heights,<br />
                                        <span className="text-white font-extrabold drop-shadow-xl">Safely & Swiftly</span>
                                    </>
                                )}
                            </h1>

                            <p className={`text-gray-200 text-base font-medium leading-relaxed mb-10 max-w-md mx-auto animate-fade-in-up drop-shadow-md ${isRTL ? 'font-cairo text-right' : 'text-left'}`} style={{animationDelay: '0.2s'}}>
                                {isRTL 
                                    ? 'نقدم حلولاً تكنولوجية متطورة تمكن الشركات من الوصول إلى آفاق جديدة بأمان وسرعة لا مثيل لهما.' 
                                    : 'We provide cutting-edge technological solutions that empower businesses to scale new heights with unparalleled safety and swiftness.'
                                }
                            </p>

                            {/* Modern CTA buttons with glassmorphism */}
                            <div className={`flex flex-col gap-4 items-center justify-center animate-fade-in-up`} style={{animationDelay: '0.4s'}}>
                                <button
                                    onClick={() => window.location.href = '/shop'}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
                                </button>
                                <button
                                    onClick={() => scrollToSection('ourServices')}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
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
                    {heroImages.map((heroImg, index) => (
                        <div
                            key={heroImg.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                                style={{
                                    backgroundImage: `url(${heroImg.image})`,
                                    filter: 'brightness(0.8) contrast(1.4) saturate(1.3) blur(0px)',
                                    imageRendering: 'crisp-edges',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        </div>
                    ))}
                    {/* Enhanced gradient overlay for better image quality */}
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight/50 via-midnight/30 to-midnight/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/20" />
                </div>

                <Navbar />

                <div className='relative z-20 max-w-7xl mx-auto px-8 lg:px-16'>
                    {/* Modern hero content with glassmorphism */}
                    <div className="flex items-center min-h-screen -translate-y-8">
                        <div className="max-w-4xl pt-20">
                            <h1 className={`text-white text-4xl font-bold leading-tight mb-6 tracking-tight animate-fade-in-up drop-shadow-lg ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                                {isRTL ? (
                                    <>
                                        نرتقي إلى آفاق جديدة،<br />
                                        <span className="text-white font-extrabold drop-shadow-xl">بأمان وسرعة</span>
                                    </>
                                ) : (
                                    <>
                                        Rising To New Heights,<br />
                                        <span className="text-white font-extrabold drop-shadow-xl">Safely & Swiftly</span>
                                    </>
                                )}
                            </h1>

                            <p className={`text-gray-200 text-base font-medium leading-relaxed mb-10 max-w-md mx-auto animate-fade-in-up drop-shadow-md ${isRTL ? 'font-cairo text-right' : 'text-left'}`} style={{animationDelay: '0.2s'}}>
                                {isRTL ? 
                                    'نقدم حلولاً تكنولوجية متطورة تمكن الشركات من الوصول إلى آفاق جديدة بأمان وسرعة لا مثيل لهما.' :
                                    'We provide cutting-edge technological solutions that empower businesses to scale new heights with unparalleled safety and swiftness.'
                                }
                            </p>

                            {/* Modern CTA buttons with glassmorphism */}
                            <div className={`flex flex-col gap-4 items-center animate-fade-in-up`} style={{animationDelay: '0.4s'}}>
                                <button
                                    onClick={() => window.location.href = '/shop'}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
                                </button>
                                <button
                                    onClick={() => scrollToSection('ourServices')}
                                    className={`py-4 px-8 bg-electricBlue hover:bg-electricBlueDark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-strong hover:shadow-xl transform hover:scale-105 hover:shadow-electricBlue/25 ${isRTL ? 'font-cairo' : ''}`}>
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