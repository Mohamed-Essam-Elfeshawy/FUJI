import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
                            <div className="relative rounded-lg logo-bg-white border border-gray-200">
                                <img
                                    className="w-16 h-12 lg:w-18 lg:h-14 xl:w-20 xl:h-16 object-contain rounded-lg p-2"
                                    src={process.env.PUBLIC_URL + '/fuji-logo (2).svg'}
                                    alt="FUJI FD Logo"
                                    loading="eager"
                                    decoding="sync"
                                    fetchpriority="high"
                                    width="80"
                                    height="56"
                                />
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
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className={`text-gray-400 text-sm ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                            {t('Copywrite')}
                        </p>

                        {/* Social Media Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://x.com/FUJIFD_KSA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                                title={isRTL ? 'تويتر' : 'Twitter'}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/fujifdksa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                title={isRTL ? 'فيسبوك' : 'Facebook'}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@fujifd_ksa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-800 transition-colors duration-300"
                                title="TikTok"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.43.27-.83.59-1.21.96-.7.7-1.11 1.62-1.02 2.61.17 1.19 1.1 2.4 2.32 2.65.83.17 1.69-.12 2.35-.6.62-.45 1.03-1.15 1.16-1.9.21-1.19.1-4.3.1-4.3 0-2.77 0-5.55.01-8.32v-.04z" />
                                </svg>
                            </a>
                        </div>

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

export default Footer;