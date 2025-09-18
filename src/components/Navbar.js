import React, { useState, useEffect } from 'react'
import fujieLogo from '../images/fujie-logo.jpg'
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";
import i18next from 'i18next';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { items } = useCart();
    const cartCount = items.reduce((s, i) => s + (i.qty || 0), 0);

    const currentLanguageCode = cookies.get('i18next')
    const [language, setLanguage] = useState(currentLanguageCode);
    const isRTL = language === 'ar';

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

    // Determine if we're on checkout page for simplified navbar
    const isCheckoutPage = location.pathname === '/checkout';
    const isHomePage = location.pathname === '/';
    
    // Navigation links based on page
    const getNavigationLinks = () => {
        if (isCheckoutPage) {
            return [
                { href: '/', label: isRTL ? 'الرئيسية' : 'Home', path: '/' },
                { href: '/shop', label: isRTL ? 'المتجر' : 'Shop', path: '/shop' },
                { href: '/contact', label: isRTL ? 'اتصل بنا' : 'Contact', path: '/contact' }
            ];
        }
        return [
            { href: '/', label: isRTL ? 'الرئيسية' : 'Home', path: '/' },
            { href: '/shop', label: isRTL ? 'المتجر' : 'Shop', path: '/shop' },
            { href: '/cart', label: isRTL ? 'السلة' : 'Cart', path: '/cart' },
            { href: '/about', label: isRTL ? 'من نحن' : 'About', path: '/about' },
            { href: '/contact', label: isRTL ? 'اتصل بنا' : 'Contact', path: '/contact' }
        ];
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white shadow-lg border-b border-gray-200' 
                : 'bg-white/95 backdrop-blur-lg shadow-md'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <img 
                            className="w-12 h-8 object-contain rounded-lg" 
                            src={fujieLogo} 
                            alt="FUJIE Logo" 
                        />
                        <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                            <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'} ${isRTL ? 'font-cairo' : ''}`}>
                                {t('App_Name')}
                            </h1>
                            <p className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-600'} ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'حلول المصاعد المتطورة' : 'Premium Elevator Solutions'}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
                            {getNavigationLinks().map((link) => (
                                <a 
                                    key={link.path}
                                    href={link.href} 
                                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 group rounded-lg ${
                                        location.pathname === link.path 
                                            ? 'text-brandRed bg-brandRed/10' 
                                            : 'text-gray-700 hover:text-brandRed hover:bg-brandRed/5'
                                    } ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-brandRed transition-all duration-300 group-hover:w-3/4 ${location.pathname === link.path ? 'w-3/4' : ''}`}></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Language, Cart, CTA */}
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        
                        {/* Language Switcher */}
                        <button
                            onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
                            className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 text-gray-700 hover:border-brandRed hover:text-brandRed hover:bg-brandRed/5 transition-all duration-300"
                        >
                            {language === 'en' ? 'ع' : 'EN'}
                        </button>

                        {/* Cart - Enhanced with better styling */}
                        {!isCheckoutPage && (
                            <a 
                                href="/cart" 
                                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                                    location.pathname === '/cart'
                                        ? 'bg-brandRed/10 text-brandRed'
                                        : 'text-gray-700 hover:text-brandRed hover:bg-brandRed/5'
                                }`}
                            >
                                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-brandRed text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                                        {cartCount}
                                    </span>
                                )}
                            </a>
                        )}

                        {/* CTA Button - Enhanced with page-specific logic */}
                        {!isCheckoutPage && (
                            <button
                                onClick={() => {
                                    if (location.pathname === '/cart') {
                                        window.location.href = '/checkout';
                                    } else if (location.pathname === '/shop') {
                                        window.open('https://wa.me/2001201029395', '_blank');
                                    } else {
                                        window.location.href = '/shop';
                                    }
                                }}
                                className={`hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    location.pathname === '/cart'
                                        ? 'bg-brandBlue hover:bg-blue-700 text-white hover:shadow-xl'
                                        : location.pathname === '/shop'
                                            ? 'bg-brandRed hover:bg-red-600 text-white hover:shadow-xl'
                                            : 'bg-brandRed hover:bg-red-600 text-white hover:shadow-xl'
                                } ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {location.pathname === '/cart' 
                                    ? (isRTL ? 'إتمام الشراء' : 'Checkout')
                                    : location.pathname === '/shop'
                                        ? (isRTL ? 'احصل على عرض سعر' : 'Get Quote')
                                        : (isRTL ? 'تسوق الآن' : 'Shop Now')
                                }
                            </button>
                        )}

                        {/* Checkout page - Contact CTA */}
                        {isCheckoutPage && (
                            <button
                                onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                className={`hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg bg-brandRed hover:bg-red-600 text-white hover:shadow-xl ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'مساعدة' : 'Help'}
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-lg transition-all duration-300 text-gray-700 hover:text-brandRed hover:bg-brandRed/5"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                showMobileMenu 
                    ? 'max-h-screen opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="bg-white shadow-lg border-t border-gray-200">
                    <div className="px-4 py-6 space-y-4">
                        
                        {/* Mobile Navigation Links */}
                        <div className="space-y-3">
                            {getNavigationLinks().map((link) => (
                                <a 
                                    key={link.path}
                                    href={link.href} 
                                    className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                                        location.pathname === link.path 
                                            ? 'bg-brandRed/10 text-brandRed' 
                                            : 'text-gray-700 hover:bg-brandRed/5 hover:text-brandRed'
                                    } ${isRTL ? 'font-cairo text-right' : ''}`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            
                            {/* Mobile Cart Link - only show if not checkout page */}
                            {!isCheckoutPage && (
                                <a 
                                    href="/cart" 
                                    className={`flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                                        location.pathname === '/cart' 
                                            ? 'bg-brandRed/10 text-brandRed' 
                                            : 'text-gray-700 hover:bg-brandRed/5 hover:text-brandRed'
                                    } ${isRTL ? 'font-cairo text-right flex-row-reverse' : ''}`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <span>{isRTL ? 'السلة' : 'Cart'}</span>
                                    {cartCount > 0 && (
                                        <span className="w-6 h-6 bg-brandRed text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </a>
                            )}
                        </div>

                        {/* Mobile CTA Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    if (location.pathname === '/cart') {
                                        window.location.href = '/checkout';
                                    } else if (location.pathname === '/shop') {
                                        window.open('https://wa.me/2001201029395', '_blank');
                                    } else if (isCheckoutPage) {
                                        window.open('https://wa.me/2001201029395', '_blank');
                                    } else {
                                        window.location.href = '/shop';
                                    }
                                    setShowMobileMenu(false);
                                }}
                                className={`w-full px-6 py-3 text-white text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    location.pathname === '/cart'
                                        ? 'bg-brandBlue hover:bg-blue-700'
                                        : 'bg-brandRed hover:bg-red-600'
                                } ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {location.pathname === '/cart' 
                                    ? (isRTL ? 'إتمام الشراء' : 'Checkout')
                                    : location.pathname === '/shop'
                                        ? (isRTL ? 'احصل على عرض سعر' : 'Get Quote')
                                        : isCheckoutPage
                                            ? (isRTL ? 'مساعدة' : 'Help')
                                            : (isRTL ? 'تسوق الآن' : 'Shop Now')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
