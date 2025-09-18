import React, { useState } from 'react'
import dribbble from '../images/Footer/dribbble.png'
import instagram from '../images/Footer/instagram.png'
import facebook from '../images/Footer/facebook.png'
import { useTranslation } from 'react-i18next'
import fujieLogo from '../images/fujie-logo.jpg'
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
        <footer className="bg-gradient-to-br from-gray-900 via-midnight to-gray-900">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
                    
                    {/* Column 1: Company Logo + Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <img className="w-12 h-8 lg:w-16 lg:h-12 object-contain rounded-lg" src={fujieLogo} alt="FUJIE Logo" />
                            <h2 
                                className={`text-xl lg:text-2xl font-bold text-white ml-3 ${isRTL ? 'font-cairo mr-3 ml-0' : ''}`}
                                dangerouslySetInnerHTML={{ __html: t('App_Name') }}
                            />
                        </div>
                        <p className={`text-gray-300 leading-relaxed mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL 
                                ? 'نحن شركة رائدة في مجال المصاعد والحلول الذكية، نقدم خدمات متميزة وحلول مبتكرة لعملائنا في جميع أنحاء المملكة.'
                                : 'We are a leading company in elevators and smart solutions, providing exceptional services and innovative solutions to our clients throughout the Kingdom.'
                            }
                        </p>
                        
                        {/* Certifications */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.open('https://drive.google.com/file/d/1g7v3MitWRWmna3HNG5QqZwKCYcU_cpP5/view?usp=sharing', '_blank')}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
                            >
                                <img className="w-5 h-5" src={company_profile} alt="Company Profile" />
                                <span className={`text-sm text-white ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'ملف الشركة' : 'Profile'}
                                </span>
                            </button>
                            <button
                                onClick={() => window.open('https://drive.google.com/file/d/1T3HJm13unuxNFNUR8g6pgTUdxiz7sL04/view?usp=sharing', '_blank')}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
                            >
                                <img className="w-8 h-6" src={vat_logo} alt="VAT Certificate" />
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'روابط سريعة' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { labelEN: 'Home', labelAR: 'الرئيسية', href: '/' },
                                { labelEN: 'Shop', labelAR: 'المتجر', href: '/shop' },
                                { labelEN: 'About Us', labelAR: 'من نحن', href: '/about' },
                                { labelEN: 'Contact', labelAR: 'تواصل معنا', href: '/contact' }
                            ].map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className={`text-gray-300 hover:text-brandRed transition-colors duration-300 flex items-center group ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <span className={`w-2 h-2 bg-brandRed rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'ml-3 mr-0' : ''}`}></span>
                                        {isRTL ? link.labelAR : link.labelEN}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services / Products */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'خدماتنا' : 'Our Services'}
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { labelEN: 'Elevator Installation', labelAR: 'تركيب المصاعد' },
                                { labelEN: 'Maintenance Services', labelAR: 'خدمات الصيانة' },
                                { labelEN: 'Modernization', labelAR: 'التحديث والتطوير' },
                                { labelEN: 'Consultation', labelAR: 'الاستشارات الفنية' }
                            ].map((service, index) => (
                                <li key={index}>
                                    <a 
                                        href="https://wa.me/2001201029395"
                                        className={`text-gray-300 hover:text-brandRed transition-colors duration-300 flex items-center group ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <span className={`w-2 h-2 bg-brandRed rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'ml-3 mr-0' : ''}`}></span>
                                        {isRTL ? service.labelAR : service.labelEN}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info + Social Media */}
                    <div>
                        <h3 className={`text-lg font-bold text-white mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'تواصل معنا' : 'Get In Touch'}
                        </h3>
                        
                        {/* Contact Info */}
                        <div className="space-y-4 mb-8">
                            <a 
                                href="tel:+2001201029395"
                                className="flex items-center gap-3 text-gray-300 hover:text-brandRed transition-colors duration-300 group"
                            >
                                <div className="w-10 h-10 bg-brandRed/20 rounded-xl flex items-center justify-center group-hover:bg-brandRed transition-colors duration-300">
                                    <svg className="w-5 h-5 text-brandRed group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>+20 120 102 9395</span>
                            </a>

                            <a 
                                href={`mailto:info@quad-dimensions.com?subject=${isRTL ? emailSubjectAR : emailSubjectEN}`}
                                className="flex items-center gap-3 text-gray-300 hover:text-brandRed transition-colors duration-300 group"
                            >
                                <div className="w-10 h-10 bg-brandRed/20 rounded-xl flex items-center justify-center group-hover:bg-brandRed transition-colors duration-300">
                                    <svg className="w-5 h-5 text-brandRed group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>info@quad-dimensions.com</span>
                            </a>

                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="w-10 h-10 bg-brandRed/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-brandRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}
                                </span>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div>
                            <h4 className={`text-sm font-semibold text-white mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'تابعنا' : 'Follow Us'}
                            </h4>
                            <div className="flex gap-3">
                                {[
                                    { name: 'facebook', icon: facebook, url: 'https://facebook.com', color: 'hover:bg-blue-600' },
                                    { name: 'instagram', icon: instagram, url: 'https://instagram.com', color: 'hover:bg-pink-600' },
                                    { name: 'dribbble', icon: dribbble, url: 'https://dribbble.com', color: 'hover:bg-purple-600' }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} group`}
                                        onMouseEnter={() => setHoveredSocial(social.name)}
                                        onMouseLeave={() => setHoveredSocial(null)}
                                    >
                                        <img 
                                            className={`w-6 h-6 transition-all duration-300 ${hoveredSocial === social.name ? 'scale-110' : ''}`}
                                            src={social.icon} 
                                            alt={social.name}
                                        />
                                    </a>
                                ))}
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