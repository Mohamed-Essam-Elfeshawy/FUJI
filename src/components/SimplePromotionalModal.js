import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SimplePromotionalModal = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Show modal immediately when component mounts
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubscribe = () => {
    if (email && phone) {
      // Create WhatsApp message
      const message = `🎁 اشتراك في العروض الترويجية - FUJI FD

📧 الإيميل: ${email}
📱 الهاتف: ${phone}

أريد الحصول على أحدث العروض والتخفيضات الحصرية من FUJI FD.

شكراً لكم! 🏢`;

      const whatsappUrl = `https://wa.me/966549561015?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-3 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-fuji-blue to-blue-600 text-white p-5 text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all"
          >
            ×
          </button>
          
          <div className="mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <span className="text-xl">🎁</span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white font-semibold shadow-sm ring-1 ring-white/20">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {i18n.language === 'ar' ? 'أهلاً بك في FUJI FD' : 'Welcome to FUJI FD'}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2 text-white">
              {i18n.language === 'ar' ? 'اشترك في العروض الترويجية' : 'Subscribe to Promotional Offers'}
            </h2>
            <p className="text-sm text-white opacity-90">
              {i18n.language === 'ar' 
                ? 'احصل على أحدث العروض والتخفيضات الحصرية' 
                : 'Get the latest exclusive offers and discounts'
              }
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-fuji-muted mb-2">
                {i18n.language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={i18n.language === 'ar' ? 'example@email.com' : 'example@email.com'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuji-blue focus:border-transparent outline-none transition-all"
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-fuji-muted mb-2">
                {i18n.language === 'ar' ? 'رقم الهاتف:' : 'Phone Number:'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={i18n.language === 'ar' ? '+966 54 956 1015' : '+966 54 956 1015'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuji-blue focus:border-transparent outline-none transition-all"
                dir="ltr"
              />
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={!email || !phone}
              className="w-full bg-gradient-to-r from-fuji-blue to-fuji-accent text-white py-2.5 px-5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <span className="mr-2">⚡</span>
              <span>
                {i18n.language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
              </span>
            </button>

            {/* Info Text */}
            <p className="text-xs text-fuji-muted text-center mt-4">
              {i18n.language === 'ar' 
                ? 'سيتم إرسالك إلى واتساب لإتمام الاشتراك وضمان وصول العروض إليك'
                : 'You will be redirected to WhatsApp to complete subscription and ensure offers reach you'
              }
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-fuji-surface px-6 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-fuji-blue bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                <span className="text-fuji-blue text-sm">🎯</span>
              </div>
              <span className="text-xs text-fuji-muted">
                {i18n.language === 'ar' ? 'عروض حصرية' : 'Exclusive Offers'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-fuji-accent bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                <span className="text-fuji-accent text-sm">💰</span>
              </div>
              <span className="text-xs text-fuji-muted">
                {i18n.language === 'ar' ? 'خصومات كبيرة' : 'Big Discounts'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-500 text-sm">🚀</span>
              </div>
              <span className="text-xs text-fuji-muted">
                {i18n.language === 'ar' ? 'أولوية في الخدمة' : 'Priority Service'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePromotionalModal;
