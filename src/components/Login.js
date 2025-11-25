import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyWhatsAppIcon from './StickyWhatsAppIcon';

const Login = () => {
    const { t } = useTranslation();
    const language = Cookies.get('i18next') || 'en';
    const isRTL = language === 'ar';
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate login process
        try {
            // Add your login logic here
            console.log('Login attempt:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Handle successful login
            alert('تم تسجيل الدخول بنجاح! / Login successful!');
            
        } catch (error) {
            console.error('Login error:', error);
            alert('فشل في تسجيل الدخول / Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            
            {/* Main Login Container */}
            <div className="min-h-screen bg-gradient-to-br from-fuji-surface via-white to-fuji-surface pt-20">
                <div className="flex items-center justify-center px-4 py-16">
                    <div className="w-full max-w-md">
                        
                        {/* Login Card */}
                        <div className="bg-white rounded-3xl shadow-strong p-8 md:p-10">
                            
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="mb-6">
                                    <h1 className={`text-3xl font-bold text-fuji-blue mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                                        {t('Company_Name') || (isRTL ? 'فوجي إف دي' : 'FUJI FD')}
                                    </h1>
                                </div>
                                
                                <div className="w-16 h-1 bg-gradient-to-r from-fuji-accent to-fuji-blue mx-auto rounded-full mb-6"></div>
                                
                                <h2 className="text-xl font-semibold text-fuji-blue">
                                    {t('Login') || 'تسجيل الدخول'}
                                </h2>
                                <p className="text-fuji-muted text-sm mt-2">
                                    {t('Welcome_back') || 'مرحباً بعودتك'}
                                </p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-fuji-blue mb-2">
                                        {t('Email') || 'البريد الإلكتروني'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('Enter_email') || 'أدخل البريد الإلكتروني'}
                                            className="w-full py-4 px-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-fuji-blue placeholder-fuji-muted"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <svg className="w-5 h-5 text-fuji-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-fuji-blue mb-2">
                                        {t('Password') || 'كلمة المرور'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder={t('Enter_password') || 'أدخل كلمة المرور'}
                                            className="w-full py-4 px-4 pl-12 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-fuji-blue placeholder-fuji-muted"
                                            required
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <svg className="w-5 h-5 text-fuji-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-fuji-muted hover:text-fuji-blue transition-colors duration-200"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-fuji-accent bg-gray-100 border-gray-300 rounded focus:ring-fuji-accent focus:ring-2"
                                        />
                                        <span className="ml-2 text-sm text-fuji-muted">
                                            {t('Remember_me') || 'تذكرني'}
                                        </span>
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm text-fuji-accent hover:text-fuji-accent-red font-medium transition-colors duration-200"
                                    >
                                        {t('Forgot_password') || 'نسيت كلمة المرور؟'}
                                    </a>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-fuji-accent to-fuji-accent-red text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>{t('Logging_in') || 'جاري تسجيل الدخول...'}</span>
                                        </>
                                    ) : (
                                        <span>{t('Login') || 'تسجيل الدخول'}</span>
                                    )}
                                </button>

                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-fuji-muted">
                                {t('Secure_login') || 'تسجيل دخول آمن ومحمي'}
                            </p>
                            <div className="flex items-center justify-center mt-2 space-x-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs text-fuji-muted">
                                    {t('SSL_encrypted') || 'مشفر بتقنية SSL'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <StickyWhatsAppIcon />
        </>
    );
};

export default Login;
