import React, { useState, useEffect } from 'react'
import { Our_Clients_Data } from './Data'
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";


const OurClients = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Sample testimonials data
    const testimonials = [
        {
            id: 1,
            nameEN: "Ahmed Al-Rashid",
            nameAR: "أحمد الراشد",
            positionEN: "CEO, Rashid Holdings",
            positionAR: "الرئيس التنفيذي، مجموعة الراشد",
            textEN: "Quad Dimensions delivered exceptional elevator solutions for our commercial complex. Their attention to safety and quality is unmatched.",
            textAR: "قدمت كواد ديمنشنز حلول مصاعد استثنائية لمجمعنا التجاري. اهتمامهم بالسلامة والجودة لا مثيل له.",
            rating: 5,
            image: "/api/placeholder/80/80"
        },
        {
            id: 2,
            nameEN: "Sarah Johnson",
            nameAR: "سارة جونسون",
            positionEN: "Hospital Administrator",
            positionAR: "مديرة المستشفى",
            textEN: "The reliability and smooth operation of their elevators in our hospital has been crucial for patient care. Highly recommended!",
            textAR: "كانت موثوقية وسلاسة تشغيل مصاعدهم في مستشفانا أمراً بالغ الأهمية لرعاية المرضى. أنصح بهم بشدة!",
            rating: 5,
            image: "/api/placeholder/80/80"
        },
        {
            id: 3,
            nameEN: "Mohammed Al-Faisal",
            nameAR: "محمد الفيصل",
            positionEN: "Property Developer",
            positionAR: "مطور عقاري",
            textEN: "Professional service from design to installation. Their modern elevator designs perfectly complement our luxury residential projects.",
            textAR: "خدمة مهنية من التصميم إلى التركيب. تصاميم مصاعدهم الحديثة تكمل مشاريعنا السكنية الفاخرة بشكل مثالي.",
            rating: 5,
            image: "/api/placeholder/80/80"
        }
    ];

    // Auto-scroll for client logos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Our_Clients_Data.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll for testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                        {t('Our_Clients')}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                        {isRTL 
                            ? 'نفتخر بثقة عملائنا المميزين من مختلف القطاعات والذين اختاروا حلولنا المتطورة'
                            : 'We are proud of the trust of our distinguished clients from various sectors who chose our advanced solutions'
                        }
                    </p>
                </div>

                {/* Client Logos Carousel */}
                <div className="relative mb-20">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-soft border border-gray-200">
                        <div className="flex transition-transform duration-500 ease-in-out" 
                             style={{ transform: `translateX(-${currentSlide * (100 / Our_Clients_Data.length)}%)` }}>
                            {Our_Clients_Data.concat(Our_Clients_Data).map((client, index) => (
                                <div key={`${client.id}-${index}`} className="flex-none w-1/5 p-8">
                                    <div className={`group relative h-32 rounded-2xl overflow-hidden transition-all duration-300 ${
                                        index % Our_Clients_Data.length === currentSlide 
                                            ? 'grayscale-0 scale-105 shadow-lg' 
                                            : 'grayscale hover:grayscale-0'
                                    }`}>
                                        <img
                                            src={client.img}
                                            alt={isRTL ? client.titleAR : client.titleEN}
                                            className="w-full h-full object-cover transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h4 className={`text-white text-sm font-semibold ${isRTL ? 'font-cairo text-right' : ''}`}>
                                                    {isRTL ? client.titleAR : client.titleEN}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-6 gap-2">
                        {Our_Clients_Data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    currentSlide === index 
                                        ? 'bg-brandRed scale-125' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-white rounded-3xl shadow-soft border border-gray-200 p-8 lg:p-12">
                    <div className="text-center mb-12">
                        <h3 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
                        </h3>
                        <p className={`text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'تجارب حقيقية من عملائنا المميزين' : 'Real experiences from our valued clients'}
                        </p>
                    </div>

                    {/* Testimonial Slider */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-in-out"
                                 style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={testimonial.id} className="flex-none w-full">
                                        <div className={`text-center ${isRTL ? 'font-cairo' : ''}`}>
                                            {/* Stars */}
                                            <div className="flex justify-center mb-6">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <blockquote className={`text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic ${isRTL ? 'text-right' : ''}`}>
                                                "{isRTL ? testimonial.textAR : testimonial.textEN}"
                                            </blockquote>

                                            {/* Client Info */}
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-brandRed to-brandBlue rounded-full flex items-center justify-center text-white text-xl font-bold">
                                                    {(isRTL ? testimonial.nameAR : testimonial.nameEN).charAt(0)}
                                                </div>
                                                <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {isRTL ? testimonial.nameAR : testimonial.nameEN}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {isRTL ? testimonial.positionAR : testimonial.positionEN}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial Navigation */}
                        <div className="flex justify-center mt-8 gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                        currentTestimonial === index 
                                            ? 'bg-brandRed scale-125' 
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { numberEN: '500+', numberAR: '٥٠٠+', labelEN: 'Projects Completed', labelAR: 'مشروع مكتمل' },
                        { numberEN: '15+', numberAR: '١٥+', labelEN: 'Years Experience', labelAR: 'سنة خبرة' },
                        { numberEN: '100+', numberAR: '١٠٠+', labelEN: 'Happy Clients', labelAR: 'عميل راضي' },
                        { numberEN: '24/7', numberAR: '٢٤/٧', labelEN: 'Support Available', labelAR: 'دعم متاح' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl lg:text-4xl font-bold text-brandRed mb-2">
                                {isRTL ? stat.numberAR : stat.numberEN}
                            </div>
                            <div className={`text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? stat.labelAR : stat.labelEN}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurClients