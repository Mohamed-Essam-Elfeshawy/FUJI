import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const SubscriptionModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    
    const [formData, setFormData] = useState({
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // التحقق من صحة البيانات
        if (!formData.email || !formData.phone) {
            alert(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
            setIsSubmitting(false);
            return;
        }

        // محاكاة إرسال البيانات
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            
            // إرسال البيانات عبر WhatsApp مع تنسيق بسيط جداً
            const message = isRTL 
                ? `طلب اشتراك في العروض الترويجية - الايميل: ${formData.email} - الهاتف: ${formData.phone}`
                : `Promotional Offers Subscription - Email: ${formData.email} - Phone: ${formData.phone}`;
            
            const whatsappUrl = `https://wa.me/966549561015?text=${encodeURIComponent(message)}`;
            
            // طباعة الرسالة في الكونسول للتأكد
            console.log('WhatsApp Message:', message);
            console.log('WhatsApp URL:', whatsappUrl);
            
            // فتح WhatsApp فوراً
            try {
                const opened = window.open(whatsappUrl, '_blank');
                if (!opened) {
                    // إذا لم يفتح في نافذة جديدة، استخدم الطريقة البديلة
                    window.location.href = whatsappUrl;
                }
                console.log('WhatsApp opened successfully');
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                // طريقة بديلة
                window.location.href = whatsappUrl;
            }
            
            // إغلاق النافذة بعد 3 ثوانٍ
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ email: '', phone: '' });
            }, 3000);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="bg-fuji-blue text-white p-6 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div className="mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL ? 'اشترك في العروض الترويجية' : 'Subscribe to Promotional Offers'}
                        </h2>
                        <p className={`text-white/90 mt-2 ${isRTL ? 'font-cairo' : ''}`}>
                            {isRTL 
                                ? 'احصل على أحدث العروض والخصومات الحصرية'
                                : 'Get the latest offers and exclusive discounts'
                            }
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                                    <span className="text-fuji-accent">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-blue focus:border-transparent transition-all duration-300 ${isRTL ? 'font-cairo text-right pr-12' : 'pl-12'}`}
                                        placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                    />
                                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`}>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                                    <span className="text-fuji-accent">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-blue focus:border-transparent transition-all duration-300 ${isRTL ? 'font-cairo text-right pr-12' : 'pl-12'}`}
                                        placeholder={isRTL ? '+966 50 123 4567' : '+966 50 123 4567'}
                                        dir="ltr"
                                    />
                                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`}>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-fuji-blue to-fuji-accent text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
                                    </div>
                                ) : (
                                    <>
                                        <span>{isRTL ? 'اشترك الآن' : 'Subscribe Now'}</span>
                                        <svg className={`w-5 h-5 inline-block ${isRTL ? 'mr-2' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* Privacy Note */}
                            <p className={`text-xs text-gray-500 text-center mt-4 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL 
                                    ? 'سنحافظ على خصوصية بياناتك ولن نشاركها مع أطراف ثالثة'
                                    : 'We will keep your data private and will not share it with third parties'
                                }
                            </p>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'تم إرسال طلب الاشتراك!' : 'Subscription Request Sent!'}
                            </h3>
                            <p className={`text-gray-600 mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL 
                                    ? 'تم فتح WhatsApp مع بياناتك'
                                    : 'WhatsApp opened with your details'
                                }
                            </p>
                            <div className={`text-sm text-gray-500 mb-4 ${isRTL ? 'font-cairo' : ''}`}>
                                <p className="mb-1">📧 {formData.email}</p>
                                <p>📱 {formData.phone}</p>
                            </div>
                            
                            {/* زر نسخ الرسالة */}
                            <button
                                onClick={() => {
                                    const message = isRTL 
                                        ? `طلب اشتراك في العروض الترويجية - الايميل: ${formData.email} - الهاتف: ${formData.phone}`
                                        : `Promotional Offers Subscription - Email: ${formData.email} - Phone: ${formData.phone}`;
                                    navigator.clipboard.writeText(message);
                                    alert(isRTL ? 'تم نسخ الرسالة' : 'Message copied');
                                }}
                                className={`px-4 py-2 bg-fuji-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm ${isRTL ? 'font-cairo' : ''}`}
                            >
                                {isRTL ? 'نسخ الرسالة' : 'Copy Message'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
