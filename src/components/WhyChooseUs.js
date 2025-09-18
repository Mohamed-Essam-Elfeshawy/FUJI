import React, { useState } from 'react'
import Heart_Icon from '../images/WhyChooseUs/Heart_Icon.svg'
import Rectangle from '../images/WhyChooseUs/Rectangle.png'
import Verified_Icon from '../images/WhyChooseUs/Verified_Icon.svg'
import { Why_Choose_Us_Data } from './Data'
import cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const WhyChooseUs = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const [hoveredFeature, setHoveredFeature] = useState(null);

    // Enhanced features with modern icons
    const features = [
        {
            id: 1,
            titleEN: "Innovation & Technology",
            titleAR: "الابتكار والتكنولوجيا",
            descriptionEN: "Cutting-edge elevator technology with smart controls and energy-efficient systems.",
            descriptionAR: "تكنولوجيا مصاعد متطورة مع أنظمة تحكم ذكية وأنظمة موفرة للطاقة.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            id: 2,
            titleEN: "Safety First",
            titleAR: "السلامة أولاً",
            descriptionEN: "Comprehensive safety protocols and certifications ensuring maximum passenger protection.",
            descriptionAR: "بروتوكولات السلامة الشاملة والشهادات التي تضمن أقصى حماية للركاب.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: 3,
            titleEN: "Premium Quality",
            titleAR: "جودة متميزة",
            descriptionEN: "High-grade materials and precision engineering for long-lasting, reliable performance.",
            descriptionAR: "مواد عالية الجودة وهندسة دقيقة لأداء موثوق وطويل الأمد.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            )
        },
        {
            id: 4,
            titleEN: "24/7 Support",
            titleAR: "دعم على مدار الساعة",
            descriptionEN: "Round-the-clock technical support and maintenance services for peace of mind.",
            descriptionAR: "دعم فني وخدمات صيانة على مدار الساعة لراحة البال.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                    
                    {/* Left Column - Content */}
                    <div className={`${isRTL ? 'lg:col-start-2 text-right' : 'text-left'}`}>
                        <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'لماذا تختار كواد ديمنشنز؟' : 'Why Choose Quad Dimensions?'}
                        </h2>
                        <p className={`text-lg text-gray-600 mb-12 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL 
                                ? 'نحن نقدم حلول مصاعد متطورة تجمع بين الابتكار والجودة والسلامة لضمان أفضل تجربة لعملائنا'
                                : 'We deliver advanced elevator solutions that combine innovation, quality, and safety to ensure the best experience for our clients'
                            }
                        </p>

                        {/* Features Grid */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                                        hoveredFeature === feature.id ? 'shadow-xl -translate-y-1 border-brandRed/20' : 'shadow-soft'
                                    }`}
                                    onMouseEnter={() => setHoveredFeature(feature.id)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                            hoveredFeature === feature.id 
                                                ? 'bg-brandRed text-white shadow-lg shadow-brandRed/30 scale-110' 
                                                : 'bg-brandRed/10 text-brandRed group-hover:bg-brandRed group-hover:text-white group-hover:shadow-lg group-hover:shadow-brandRed/30'
                                        }`}>
                                            {feature.icon}
                                        </div>
                                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 ${
                                                hoveredFeature === feature.id ? 'text-brandRed' : 'group-hover:text-brandRed'
                                            } ${isRTL ? 'font-cairo' : ''}`}>
                                                {isRTL ? feature.titleAR : feature.titleEN}
                                            </h3>
                                            <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                                                {isRTL ? feature.descriptionAR : feature.descriptionEN}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-12">
                            <button
                                onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                className={`px-8 py-4 bg-brandRed hover:bg-red-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className={`${isRTL ? 'lg:col-start-1' : ''} relative`}>
                        <div className="relative">
                            <img
                                src={Rectangle}
                                alt="Quad Dimensions Excellence"
                                className="w-full h-auto rounded-3xl shadow-2xl"
                            />
                            
                            {/* Floating Badges */}
                            <div className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200/50`}>
                                <div className="flex items-center gap-3">
                                    <img src={Verified_Icon} alt="Verified" className="w-8 h-8" />
                                    <div>
                                        <p className={`text-sm font-semibold text-gray-900 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'معتمد وموصى به' : 'Verified & Recommended'}
                                        </p>
                                        <p className={`text-xs text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'شهادة الجودة' : 'Quality Certified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brandRed to-brandBlue rounded-full flex items-center justify-center">
                                        <img src={Heart_Icon} alt="Experience" className="w-8 h-8 filter brightness-0 invert" />
                                    </div>
                                    <div>
                                        <p className={`text-lg font-bold text-gray-900 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? '15+ سنة' : '15+ Years'}
                                        </p>
                                        <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'من الخبرة' : 'Experience'}
                                        </p>
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

export default WhyChooseUs