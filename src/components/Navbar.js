import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import fujiLogo from '../images/fujie-logo.jpg';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import ThemeToggle from './ThemeToggle';
import SubscriptionModal from './SubscriptionModal';
import i18next from 'i18next';

const Navbar = () => {
    const { t } = useTranslation();
    const location = window.location;
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const { items } = useCart();

    const currentLanguageCode = cookies.get('i18next')
    const [language, setLanguage] = useState(currentLanguageCode);
    const isRTL = language === 'ar';
    
    const cartItemsCount = items.reduce((total, item) => total + item.qty, 0);

    // Scroll detection for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        cookies.set('i18next', lng);
        setLanguage(lng);
        window.location.reload();
    };

    // Navigation links
    const getNavigationLinks = () => {
        const links = [
            { href: '/', label: isRTL ? 'الرئيسية' : 'Home', path: '/' },
            { href: '/shop', label: isRTL ? 'المتجر' : 'Shop', path: '/shop' },
            { href: '/blog', label: isRTL ? 'المدونة' : 'Blog', path: '/blog' },
            { href: '/about', label: isRTL ? 'من نحن' : 'About', path: '/about' },
            { href: '/contact', label: isRTL ? 'اتصل بنا' : 'Contact', path: '/contact' },
            { href: '/login', label: isRTL ? 'تسجيل الدخول' : 'Login', path: '/login' }
        ];
        return links;
    };

    return (
        <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
                    
                    {/* Logo Section */}
                    <div className={`flex items-center gap-2 sm:gap-3 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="relative group">
                            <img 
                                className="w-8 h-6 sm:w-10 sm:h-7 md:w-12 md:h-8 lg:w-14 lg:h-10 object-contain rounded-lg shadow-md bg-white p-1 border border-fuji-blue/20 hover:shadow-lg hover:border-fuji-blue/40 transition-all duration-300 group-hover:scale-105" 
                                src={fujiLogo} 
                                alt="FUJI FD Logo" 
                                style={{
                                    filter: 'brightness(1.1) contrast(1.3) saturate(1.2)',
                                    imageRendering: 'crisp-edges'
                                }}
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-fuji-blue/20 to-fuji-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                        <div className={`${isRTL ? 'text-right' : 'text-left'} hidden sm:block`}>
                            <h1 className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold ${isRTL ? 'font-cairo' : ''} text-fuji-blue hover:text-fuji-accent transition-colors duration-300`}>
                                {t('App_Name')}
                            </h1>
                            <p className={`text-xs md:text-sm lg:text-sm xl:text-sm ${isRTL ? 'font-cairo' : ''} text-fuji-muted`}>
                                {isRTL ? 'حلول المصاعد المتطورة' : 'Premium Elevator Solutions'}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center flex-1 justify-center mx-4">
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 xl:space-x-4' : 'space-x-2 xl:space-x-4'}`}>
                            {getNavigationLinks().map((link) => (
                                <a 
                                    key={link.path}
                                    href={link.href} 
                                    className={`relative px-2 py-1.5 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 text-sm lg:text-sm xl:text-base font-semibold transition-all duration-300 group rounded-lg whitespace-nowrap ${
                                        location.pathname === link.path 
                                            ? 'text-fuji-blue bg-fuji-blue/10' 
                                            : 'text-fuji-blue hover:text-fuji-blue hover:bg-fuji-blue/5'
                                    } ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-fuji-blue transition-all duration-300 group-hover:w-3/4 ${location.pathname === link.path ? 'w-3/4' : ''}`}></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Language, Theme, Cart, Mobile Menu */}
                    <div className={`flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-4 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        
                        {/* Subscription Button - Hidden on small screens */}
                        <button
                            onClick={() => setIsSubscriptionModalOpen(true)}
                            className="hidden sm:flex px-2 py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-xs sm:text-sm md:text-sm font-medium rounded-lg bg-fuji-accent text-white hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
                        >
                            <span className={`${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? '🎁 العروض' : '🎁 Offers'}
                            </span>
                        </button>

                        {/* Language Switcher */}
                        <button
                            onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-2 text-xs sm:text-sm md:text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-fuji-blue hover:text-fuji-blue hover:bg-fuji-blue/5 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
                        >
                            {language === 'en' ? 'ع' : 'EN'}
                        </button>

                        {/* Theme Toggle - Hidden on mobile */}
                        <div className="hidden md:block flex-shrink-0">
                            <ThemeToggle className="scale-90 lg:scale-100" />
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg bg-gradient-to-br from-fuji-blue/5 to-fuji-blue/10 hover:from-fuji-blue/10 hover:to-fuji-blue/20 text-fuji-blue hover:text-fuji-blue transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md group flex-shrink-0"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-fuji-accent to-red-600 text-white text-xs font-bold rounded-full min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white animate-pulse">
                                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                                </span>
                            )}
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-fuji-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="lg:hidden p-1.5 sm:p-2 rounded-lg transition-all duration-300 text-gray-700 hover:text-fuji-accent hover:bg-fuji-accent/5 shadow-sm hover:shadow-md flex-shrink-0"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showMobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${
                showMobileMenu 
                    ? 'max-h-screen opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="bg-white shadow-lg border-t border-gray-200">
                    <div className="px-4 py-4 space-y-4">
                        
                        {/* Mobile Navigation Links */}
                        <div className="space-y-2">
                            {getNavigationLinks().map((link) => (
                                <a 
                                    key={link.path}
                                    href={link.href} 
                                    className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                                        location.pathname === link.path 
                                            ? 'bg-fuji-accent/10 text-fuji-accent' 
                                            : 'text-gray-700 hover:bg-fuji-accent/5 hover:text-fuji-accent'
                                    } ${isRTL ? 'font-cairo text-right' : ''}`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            
                        </div>

                        {/* Mobile Subscription Button */}
                        <div className="pt-3 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setIsSubscriptionModalOpen(true);
                                    setShowMobileMenu(false);
                                }}
                                className={`w-full px-4 py-3 bg-fuji-accent text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg mb-3 ${isRTL ? 'font-cairo' : ''}`}
                            >
                                <span className="flex items-center justify-center">
                                    <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>🎁</span>
                                    {isRTL ? 'اشترك في العروض الترويجية' : 'Subscribe to Offers'}
                                </span>
                            </button>
                        </div>

                        {/* Mobile Theme Toggle & Language */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium text-gray-700 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? 'المظهر:' : 'Theme:'}
                                </span>
                                <ThemeToggle />
                            </div>
                            <button
                                onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
                                className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-fuji-blue hover:text-fuji-blue hover:bg-fuji-blue/5 transition-all duration-300"
                            >
                                {language === 'en' ? 'العربية' : 'English'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
        
        {/* Cart Modal */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {/* Subscription Modal */}
        <SubscriptionModal 
            isOpen={isSubscriptionModalOpen} 
            onClose={() => setIsSubscriptionModalOpen(false)} 
        />
        </>
    );
};

export default Navbar;
