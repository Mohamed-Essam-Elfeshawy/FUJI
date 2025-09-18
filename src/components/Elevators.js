import React, { useState } from 'react'
import { Elevators_Data } from './Data';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const Elevators = () => {
    const { t } = useTranslation();
    const [activeElevator, setActiveElevator] = useState(0);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';

    // Categories for better organization
    const categories = [
        {
            titleEN: "Residential Elevators",
            titleAR: "مصاعد سكنية",
            elevators: [0, 2] // Gearbox, Panorama
        },
        {
            titleEN: "Commercial Elevators", 
            titleAR: "مصاعد تجارية",
            elevators: [1, 4] // Gearless, Food
        },
        {
            titleEN: "Accessibility Elevators",
            titleAR: "مصاعد ذوي الاحتياجات",
            elevators: [3] // Platform
        }
    ];

    const handleElevatorChange = (index) => {
        setActiveElevator(index);
        setShowMobileFilter(false);
    };

    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                        {t('Elevators')}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL 
                            ? 'اكتشف مجموعتنا المتنوعة من المصاعد المصممة لتلبية احتياجاتك المختلفة'
                            : 'Discover our diverse range of elevators designed to meet your various needs'
                        }
                    </p>
                </div>

                {/* Mobile Dropdown Filter */}
                <div className="lg:hidden mb-8">
                    <div className="relative">
                        <button
                            onClick={() => setShowMobileFilter(!showMobileFilter)}
                            className={`w-full bg-white rounded-2xl border border-gray-200 px-6 py-4 flex items-center justify-between shadow-soft hover:shadow-medium transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                            <span className={`text-lg font-semibold text-gray-900 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? Elevators_Data[activeElevator].titleAR : Elevators_Data[activeElevator].titleEN}
                            </span>
                            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showMobileFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {showMobileFilter && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl z-20 overflow-hidden">
                                {Elevators_Data.map((elevator, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleElevatorChange(index)}
                                        className={`w-full px-6 py-4 text-left transition-all duration-300 ${
                                            activeElevator === index 
                                                ? 'bg-brandRed text-white' 
                                                : 'text-gray-700 hover:bg-gray-50'
                                        } ${isRTL ? 'text-right font-cairo' : ''}`}
                                    >
                                        {isRTL ? elevator.titleAR : elevator.titleEN}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Two-Column Layout */}
                <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                    
                    {/* Left Sidebar - 25% width on desktop */}
                    <div className={`hidden lg:block ${isRTL ? 'lg:col-start-4' : ''}`}>
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-soft p-8 sticky top-8">
                            <h3 className={`text-xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                {isRTL ? 'أنواع المصاعد' : 'Elevator Types'}
                            </h3>
                            
                            {/* Category-based Navigation */}
                            <div className="space-y-6">
                                {categories.map((category, categoryIndex) => (
                                    <div key={categoryIndex}>
                                        <h4 className={`text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {isRTL ? category.titleAR : category.titleEN}
                                        </h4>
                                        <div className="space-y-2">
                                            {category.elevators.map((elevatorIndex) => (
                                                <button
                                                    key={elevatorIndex}
                                                    onClick={() => setActiveElevator(elevatorIndex)}
                                                    className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                                        activeElevator === elevatorIndex
                                                            ? 'bg-brandRed text-white shadow-lg transform scale-105'
                                                            : 'text-gray-700 hover:bg-brandRed/5 hover:text-brandRed border border-gray-200 hover:border-brandRed/20'
                                                    } ${isRTL ? 'text-right font-cairo' : 'text-left'}`}
                                                >
                                                    {isRTL ? Elevators_Data[elevatorIndex].titleAR : Elevators_Data[elevatorIndex].titleEN}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area - 75% width on desktop */}
                    <div className={`lg:col-span-3 ${isRTL ? 'lg:col-start-1' : ''}`}>
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-soft overflow-hidden">
                            
                            {/* Product Image */}
                            <div className="relative h-96 lg:h-[500px] overflow-hidden">
                                <img
                                    src={Elevators_Data[activeElevator].image}
                                    alt={isRTL ? Elevators_Data[activeElevator].titleAR : Elevators_Data[activeElevator].titleEN}
                                    className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                
                                {/* Floating Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-brandRed text-sm font-semibold rounded-full shadow-lg">
                                        {isRTL ? 'مصعد متميز' : 'Premium Elevator'}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-8 lg:p-12">
                                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                                    
                                    {/* Title */}
                                    <h3 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                                        {isRTL ? Elevators_Data[activeElevator].titleAR : Elevators_Data[activeElevator].titleEN}
                                    </h3>

                                    {/* Specifications */}
                                    <div className="mb-8">
                                        <h4 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'المواصفات الرئيسية:' : 'Key Specifications:'}
                                        </h4>
                                        <ul className="space-y-3">
                                            {(isRTL ? Elevators_Data[activeElevator].pointsAR : Elevators_Data[activeElevator].pointsEN).map((point, index) => (
                                                <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <div className="w-2 h-2 bg-brandRed rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className={`text-gray-700 leading-relaxed ${isRTL ? 'font-cairo text-right' : ''}`}>
                                                        {point}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Call-to-Action Buttons */}
                                    <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                                        <button
                                            onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                            className={`px-8 py-4 bg-brandRed hover:bg-red-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 ${isRTL ? 'font-cairo' : ''}`}
                                        >
                                            {isRTL ? 'اطلب الآن' : 'Request Quote'}
                                        </button>
                                        <button
                                            onClick={() => window.location.href = '/contact'}
                                            className={`px-8 py-4 bg-white border-2 border-brandBlue text-brandBlue hover:bg-brandBlue hover:text-white text-lg font-semibold rounded-2xl transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
                                        >
                                            {isRTL ? 'تفاصيل أكثر' : 'Learn More'}
                                        </button>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <div className={`flex items-center gap-4 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse font-cairo' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{isRTL ? 'ضمان شامل' : 'Full Warranty'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                <span>{isRTL ? 'تركيب سريع' : 'Fast Installation'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{isRTL ? 'دعم فني 24/7' : '24/7 Support'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Elevators