import React, { useState } from 'react'
import dribbble from '../images/Footer/dribbble.png'
import instagram from '../images/Footer/instagram.png'
import facebook from '../images/Footer/facebook.png'
import { useTranslation } from 'react-i18next'
import fujiLogo from '../images/fujie-logo.jpg'
import company_profile from '../images/Footer/company_profile.png'
import vat_logo from '../images/Footer/vat_logo.png'
import cookies from "js-cookie";

const Footer = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const emailSubjectEN = 'Inquiry About Elevator Services';
    const emailSubjectAR = 'استفسار حول خدمات المصاعد';

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    
                    {/* Column 1: Company Logo + Description */}
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <img 
                                    className="w-16 h-12 lg:w-18 lg:h-14 xl:w-20 xl:h-16 object-contain rounded-lg shadow-lg bg-white p-2 border border-gray-300" 
                                    src={fujiLogo} 
                                    alt="FUJI FD Logo" 
                                    style={{
                                        filter: 'brightness(1.2) contrast(1.3) saturate(1.2)',
                                        imageRendering: 'crisp-edges'
                                    }}
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-lg blur opacity-50 -z-10"></div>
                            </div>
                            <div className={`${isRTL ? 'text-right mr-3' : 'text-left ml-3'}`}>
                                <h2 className={`text-xl lg:text-2xl font-bold text-white ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {t('App_Name')}
                                </h2>
                                <p className={`text-xs lg:text-sm text-gray-300 mt-1 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {isRTL ? 'حلول المصاعد المتطورة' : 'Premium Elevator Solutions'}
                                </p>
                            </div>
                        </div>
                        <p className={`text-gray-300 leading-relaxed mb-6 text-sm ${isRTL ? 'font-cairo text-right' : ''}`}>
                            {isRTL 
                                ? 'نحن شركة رائدة في مجال المصاعد والحلول الذكية، نقدم خدمات متميزة وحلول مبتكرة لعملائنا في جميع أنحاء المملكة.'
                                : 'We are a leading company in elevators and smart solutions, providing exceptional services and innovative solutions to our clients throughout the Kingdom.'
                            }
                        </p>
                        
                        {/* Certifications & Social Media */}
                        <div className="space-y-3">
                            <button
                                onClick={() => window.open('/catalog/catalog.pdf', '_blank')}
                                className={`flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm ${isRTL ? 'justify-start' : 'justify-start'}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <img className="w-4 h-4" src={company_profile} alt="Company Profile" />
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'ملف الشركة' : 'Company Profile'}
                                </span>
                            </button>
                            
                            <button
                                onClick={() => window.open('https://drive.google.com/file/d/1T3HJm13unuxNFNUR8g6pgTUdxiz7sL04/view?usp=sharing', '_blank')}
                                className={`flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm ${isRTL ? 'justify-start' : 'justify-start'}`}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <img className="w-4 h-4" src={vat_logo} alt="VAT Certificate" />
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'شهادة ضريبية' : 'VAT Certificate'}
                                </span>
                            </button>
                            
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'روابط سريعة' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { labelEN: 'Home', labelAR: 'الرئيسية', href: '/' },
                                { labelEN: 'Shop', labelAR: 'المتجر', href: '/shop' },
                                { labelEN: 'About Us', labelAR: 'من نحن', href: '/about' },
                                { labelEN: 'Contact', labelAR: 'تواصل معنا', href: '/contact' },
                                { labelEN: 'Blog', labelAR: 'المدونة', href: '/blog' }
                            ].map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className={`text-gray-300 hover:text-red-500 transition-colors duration-300 flex items-center group text-sm ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <span className={`w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'ml-2 mr-0' : ''}`}></span>
                                        {isRTL ? link.labelAR : link.labelEN}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'خدماتنا' : 'Our Services'}
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { labelEN: 'Elevator Installation', labelAR: 'تركيب المصاعد' },
                                { labelEN: 'Maintenance Services', labelAR: 'خدمات الصيانة' },
                                { labelEN: 'Modernization', labelAR: 'التحديث والتطوير' },
                                { labelEN: 'Consultation', labelAR: 'الاستشارات الفنية' },
                                { labelEN: 'Emergency Repair', labelAR: 'الإصلاح الطارئ' }
                            ].map((service, index) => (
                                <li key={index}>
                                    <a 
                                        href="https://wa.me/966549561015"
                                        className={`text-gray-300 hover:text-red-500 transition-colors duration-300 flex items-center group text-sm ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <span className={`w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'ml-2 mr-0' : ''}`}></span>
                                        {isRTL ? service.labelAR : service.labelEN}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'تواصل معنا' : 'Contact Info'}
                        </h3>
                        
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <a 
                                href="tel:+966549561015"
                                className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors duration-300 group"
                            >
                                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? '1015 956 54 966+' : '+966 54 956 1015'}
                                </span>
                            </a>

                            <a 
                                href={`mailto:info@fujifd-ksa.com?subject=${isRTL ? emailSubjectAR : emailSubjectEN}`}
                                className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors duration-300 group"
                            >
                                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                                    <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>info@fujifd-ksa.com</span>
                            </a>

                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-white/10 bg-black/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6">
                    <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                        <p className={`text-gray-400 text-sm ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                            {t('Copywrite')}
                        </p>
                        <div className="flex items-center gap-6">
                            <a 
                                href="/privacy" 
                                className={`text-gray-400 hover:text-white text-sm transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </a>
                            <a 
                                href="/terms" 
                                className={`text-gray-400 hover:text-white text-sm transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'الشروط والأحكام' : 'Terms of Service'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer