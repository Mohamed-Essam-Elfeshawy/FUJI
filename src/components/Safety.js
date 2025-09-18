import { useTranslation } from 'react-i18next';
import React, { useState } from 'react'
import { Safety_Data } from './Data'
import cookies from "js-cookie";

const Safety = () => {
    const { t } = useTranslation();
    const [hoveredCard, setHoveredCard] = useState(null);
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';

    const safetyFeatures = [
        {
            id: 1,
            titleEN: "Mechanical Systems",
            titleAR: "الأنظمة الميكانيكية",
            descriptionEN: "Advanced mechanical safety systems ensuring reliable operation and passenger protection.",
            descriptionAR: "أنظمة السلامة الميكانيكية المتطورة التي تضمن التشغيل الموثوق وحماية الركاب.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            image: Safety_Data[0]
        },
        {
            id: 2,
            titleEN: "Electrical Systems",
            titleAR: "الأنظمة الكهربائية",
            descriptionEN: "State-of-the-art electrical safety protocols and emergency backup systems.",
            descriptionAR: "بروتوكولات السلامة الكهربائية الحديثة وأنظمة النسخ الاحتياطي للطوارئ.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            image: Safety_Data[1]
        },
        {
            id: 3,
            titleEN: "Support Systems",
            titleAR: "أنظمة الدعم",
            descriptionEN: "24/7 monitoring and support systems for immediate emergency response.",
            descriptionAR: "أنظمة المراقبة والدعم على مدار الساعة للاستجابة الفورية للطوارئ.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            image: Safety_Data[2]
        },
        {
            id: 4,
            titleEN: "Quality Certifications",
            titleAR: "شهادات الجودة",
            descriptionEN: "International safety certifications and compliance with global standards.",
            descriptionAR: "شهادات السلامة الدولية والامتثال للمعايير العالمية.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            image: Safety_Data[0] // Reuse first image for certification
        }
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                        {t('Safety')}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL 
                            ? 'نحن ملتزمون بأعلى معايير السلامة والجودة في جميع منتجاتنا وخدماتنا لضمان حماية مثلى للمستخدمين'
                            : 'We are committed to the highest safety and quality standards in all our products and services to ensure optimal user protection'
                        }
                    </p>
                </div>

                {/* Safety Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {safetyFeatures.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`group relative bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                                hoveredCard === feature.id ? 'shadow-2xl -translate-y-2' : 'shadow-soft'
                            }`}
                            onMouseEnter={() => setHoveredCard(feature.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Icon Container */}
                            <div className={`relative mb-6 ${isRTL ? 'flex justify-end' : ''}`}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                    hoveredCard === feature.id 
                                        ? 'bg-brandRed text-white shadow-lg shadow-brandRed/30 scale-110' 
                                        : 'bg-brandRed/10 text-brandRed group-hover:bg-brandRed group-hover:text-white group-hover:shadow-lg group-hover:shadow-brandRed/30 group-hover:scale-110'
                                }`}>
                                    {feature.icon}
                                </div>
                                
                                {/* Decorative Glow Effect */}
                                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                                    hoveredCard === feature.id ? 'opacity-20' : 'opacity-0'
                                } bg-brandRed blur-xl`}></div>
                            </div>

                            {/* Content */}
                            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                                <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 ${
                                    hoveredCard === feature.id ? 'text-brandRed' : 'group-hover:text-brandRed'
                                } ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? feature.titleAR : feature.titleEN}
                                </h3>
                                
                                <p className={`text-gray-600 leading-relaxed text-sm ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? feature.descriptionAR : feature.descriptionEN}
                                </p>
                            </div>

                            {/* Hover Accent Line */}
                            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brandRed to-brandBlue transition-all duration-500 rounded-b-3xl ${
                                hoveredCard === feature.id ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></div>

                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-5 overflow-hidden rounded-tr-3xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-brandRed to-brandBlue transform rotate-45 translate-x-8 -translate-y-8"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-brandRed/5 to-brandBlue/5 rounded-3xl p-8 lg:p-12">
                        <h3 className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'هل تحتاج إلى مزيد من المعلومات حول معايير السلامة؟' : 'Need more information about our safety standards?'}
                        </h3>
                        <p className={`text-gray-600 mb-8 max-w-2xl mx-auto ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL 
                                ? 'تواصل معنا للحصول على تفاصيل شاملة حول شهادات السلامة والمعايير الدولية التي نلتزم بها'
                                : 'Contact us for comprehensive details about safety certifications and international standards we adhere to'
                            }
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                            <button
                                onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                className={`px-8 py-4 bg-brandRed hover:bg-red-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'تواصل معنا' : 'Contact Us'}
                            </button>
                            <button
                                onClick={() => window.location.href = '/about'}
                                className={`px-8 py-4 bg-white border-2 border-brandBlue text-brandBlue hover:bg-brandBlue hover:text-white text-lg font-semibold rounded-2xl transition-all duration-300 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'اعرف المزيد' : 'Learn More'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Safety