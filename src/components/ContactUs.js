import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyWhatsAppIcon from './StickyWhatsAppIcon';
// import AnimateOnScroll from './AnimateOnScroll';
// import StaggerAnimation from './StaggerAnimation';
import emailjs from '@emailjs/browser';
import cookies from "js-cookie";
// import { sendContactEmail, sendDirectEmail } from '../utils/emailService';

// EmailJS configuration (set these in a .env file: REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY)
const EMAILJS_SERVICE_ID = 'service_ap8cuwt';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_USER_ID || '';

const ContactUs = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ open: false, type: 'success', text: '' });

    const showToast = (text, type = 'success') => {
        setToast({ open: true, type, text });
        // Auto hide after 4s
        setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
                // Include multiple aliases so it works with most EmailJS template setups
                const templateParams = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    // Common email field aliases
                    from_email: formData.emailAddress,
                    reply_to: formData.emailAddress,
                    email: formData.emailAddress,
                    user_email: formData.emailAddress,
                    // Other fields
                    phone: formData.phoneNumber || 'غير محدد',
                    subject: formData.subject,
                    message: formData.message,
                };

                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                );

                setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' });
                showToast(isRTL ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!', 'success');
                return;
            }
            const emailSubject = encodeURIComponent(`رسالة من موقع FUJI FD: ${formData.subject}`);
            const emailBody = encodeURIComponent(`
🏢 رسالة جديدة من موقع FUJI FD

👤 معلومات المرسل:
الاسم: ${formData.firstName} ${formData.lastName}
البريد الإلكتروني: ${formData.emailAddress}
رقم الهاتف: ${formData.phoneNumber || 'غير محدد'}

📋 تفاصيل الرسالة:
الموضوع: ${formData.subject}

💬 الرسالة:
${formData.message}

---
تم إرسال هذه الرسالة من نموذج التواصل في موقع FUJI FD
التاريخ: ${new Date().toLocaleString('ar-SA')}
            `);

            const mailtoLink = `mailto:melfeshawy42@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            window.open(mailtoLink);
            
            setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' });
            
            showToast(
                isRTL
                    ? "تم فتح تطبيق البريد الإلكتروني. يرجى الضغط على 'إرسال' لإتمام العملية."
                    : "Email app opened. Please click 'Send' to complete the process.",
                'info'
            );
        } catch (err) {
            console.log('Error:', err);
            showToast(
                isRTL
                    ? "حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على: melfeshawy42@gmail.com"
                    : "An error occurred. Please try again or contact us directly at: melfeshawy42@gmail.com",
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {toast.open && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <div
                        className={
                            `flex items-start gap-3 rounded-xl border p-4 shadow-lg transition-all duration-300 ` +
                            (toast.type === 'success'
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : toast.type === 'info'
                                ? 'bg-blue-50 border-blue-200 text-blue-800'
                                : 'bg-red-50 border-red-200 text-red-800')
                        }
                        role="status"
                        aria-live="polite"
                    >
                        {toast.type === 'success' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {toast.type === 'info' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 8v8m0 4a9 9 0 110-18 9 9 0 010 18z" />
                            </svg>
                        )}
                        <div className={`text-sm ${isRTL ? 'font-cairo text-right' : ''}`}>{toast.text}</div>
                        <button
                            onClick={() => setToast((prev) => ({ ...prev, open: false }))}
                            className="ml-auto text-gray-400 hover:text-gray-600"
                            aria-label={isRTL ? 'إغلاق' : 'Close'}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            {/* Mobile */}
            <div className='lg:hidden'>
                <Navbar />
                <div className='pt-28 pb-16 px-4'>

                    {/* Hero Section */}
                    <div className='text-center mb-12'>
                        <span className='inline-block bg-brandRed/10 text-brandRed px-6 py-2 rounded-full text-sm font-semibold mb-4'>
                            {t('Get_in_Touch') || 'تواصل معنا'}
                        </span>
                        <h1 className='text-3xl font-bold text-fujiBlue mb-4'>
                            {t('Lets_talk_about_your_project') || 'تواصل معنا الآن'}
                        </h1>
                        <p className='text-[#C0392B] text-base leading-relaxed'>
                            {t('need_help') || 'نحن هنا لمساعدتك في مشروعك'}
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-white rounded-3xl shadow-strong p-6 mb-6'>
                        <div className='text-center mb-6'>
                            <h2 className={`text-2xl font-bold text-fujiBlue mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'إرسال رسالة' : 'Send Message'}
                            </h2>
                            <p className={`text-gray-600 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'نحن هنا لمساعدتك، تواصل معنا الآن' : 'We are here to help you, contact us now'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            {/* Name Fields Row */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {t('First_Name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder={t('First_Name')}
                                        className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {t('Last_Name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder={t('Last_Name')}
                                        className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contact Fields Row */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {t('Email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="emailAddress"
                                        value={formData.emailAddress}
                                        onChange={handleChange}
                                        placeholder={t('Email')}
                                        className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {t('Phone_Number')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder={t('Phone_Number')}
                                        className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                    />
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {t('Subject')}
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder={t('Subject')}
                                    className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                    required
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                    {t('Message')}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('Message')}
                                    rows="6"
                                    className={`w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none bg-gray-50 focus:bg-white ${isRTL ? 'text-right font-cairo' : ''}`}
                                    required
                                />
                            </div>

                            <div className='pt-2'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 bg-gradient-to-r from-brandRed to-red-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {isSubmitting ? 'جاري الإرسال...' : (t('Send_a_Message') || 'إرسال الرسالة')}
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Contact Info */}
                    <div className='space-y-6'>
                        <a href="tel:+966549561015" className='flex items-center space-x-4 rtl:space-x-reverse p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group'>
                            <div className='w-12 h-12 bg-brandRed/10 text-brandRed rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brandRed group-hover:text-white transition-colors duration-300'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm text-gray-500 font-medium'>{t('Phone_Number')}</h3>
                                <p className={`text-lg font-bold text-fujiBlue group-hover:text-brandRed transition-colors duration-300 ${isRTL ? 'font-cairo' : ''}`}>
                                    {isRTL ? '1015 956 54 966+' : '+966 54 956 1015'}
                                </p>
                            </div>
                        </a>

                        <div className='flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-soft'>
                            <div className='w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-xl flex items-center justify-center flex-shrink-0'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm text-gray-500 font-medium'>{t('Email')}</h3>
                                <p className='text-lg font-bold text-fujiBlue'>info@fujifd-ksa.com</p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-soft'>
                            <div className='w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm text-gray-500 font-medium'>{t('Map_Street')}</h3>
                                <p className='text-lg font-bold text-fujiBlue'>{t('District_Name')}</p>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <button
                            onClick={() => window.open('https://wa.me/966549561015', '_blank')}
                            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
                            </svg>
                            <span>WhatsApp</span>
                        </button>

                        {/* Map */}
                        <div className='bg-white rounded-3xl shadow-strong overflow-hidden'>
                            <iframe
                                className='w-full h-64'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.2891234567!2d39.1234567!3d21.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1234567%3A0x1234567890abcdef!2sFUJI%20FD!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="FUJI FD Location"
                            />
                        </div>

                        {/* Google Reviews Link - Mobile */}
                        <div className='bg-white rounded-3xl shadow-strong p-4'>
                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center'>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className={`text-base font-bold text-fujiBlue ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'تقييمات جوجل' : 'Google Reviews'}
                                        </h3>
                                        <p className={`text-xs text-gray-500 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? 'اطلع على تقييمات عملائنا' : 'See what our clients say'}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <a
                                href="https://maps.app.goo.gl/H6pFwFFmnDB6dZhV7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm ${isRTL ? 'font-cairo' : ''}`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                {isRTL ? 'عرض على خرائط جوجل' : 'View on Google Maps'}
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Desktop */}
            <div className='hidden lg:block'>
                <Navbar />
                <div className='pt-28 pb-20 bg-white'>
                    {/* Hero Section */}
                    <div className='max-w-7xl mx-auto px-8 text-center mb-20'>
                        <span className='inline-block bg-brandRed/10 text-brandRed px-8 py-3 rounded-full text-lg font-semibold mb-6'>
                            {t('Get_in_Touch') || 'تواصل معنا'}
                        </span>
                        <h1 className='text-5xl font-bold text-fujiBlue mb-6'>
                            {t('Lets_talk_about_your_project') || 'تواصل معنا الآن'}
                        </h1>
                        <p className='text-xl text-[#C0392B] max-w-3xl mx-auto leading-relaxed'>
                            {t('need_help') || 'نحن هنا لمساعدتك في مشروعك'}
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className='max-w-7xl mx-auto px-8'>
                        <div className='grid lg:grid-cols-2 gap-16 bg-fuji-surface rounded-3xl p-12'>
                            {/* Left Column - Contact Form */}
                            <div className='bg-white rounded-3xl shadow-strong p-12'>
                                <div className='text-center mb-8'>
                                    <h2 className={`text-3xl font-bold text-fuji-blue mb-3 ${isRTL ? 'font-cairo' : ''}`}>
                                        {isRTL ? 'إرسال رسالة' : 'Send Message'}
                                    </h2>
                                    <p className={`text-fuji-muted ${isRTL ? 'font-cairo' : ''}`}>
                                        {isRTL ? 'نحن هنا لمساعدتك، تواصل معنا الآن' : 'We are here to help you, contact us now'}
                                    </p>
                                </div>




                                <form onSubmit={handleSubmit} className=' mt-[40px]  p-6  '>
                                    {/* First Name Field */}    
                                    <div className='mb-[40px]'>
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('First_Name')}
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder={t('First_Name')}
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                            required
                                        />
                                    </div>

                                    {/* Last Name Field */}
                                    <div  className='mb-[40px]'>
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('Last_Name')}
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder={t('Last_Name')}
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className='mb-[40px]'>
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('Email')}
                                        </label>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            placeholder={t('Email')}
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                            required
                                        />
                                    </div>

                                    {/* Phone Number Field */}
                                    <div className='mb-[40px]'>
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('Phone_Number')}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder={t('Phone_Number')}
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div className='mb-[40px]'>
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('Subject')}
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder={t('Subject')}
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                            required
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div className='mb-6'> 
                                        <label className={`block text-sm font-semibold text-fuji-blue mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {t('Message')}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t('Message')}
                                            rows="4"
                                            className={`w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuji-accent focus:border-fuji-accent transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none bg-fuji-surface focus:bg-white hover:border-fuji-blue/30 ${isRTL ? 'text-right font-cairo' : ''}`}
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className='pt-[30px]'>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 bg-gradient-to-r from-fuji-accent to-red-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-fuji-accent/90 hover:to-red-600/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-lg ${isRTL ? 'font-cairo' : ''}`}
                                        >
                                            <div className='flex items-center justify-center space-x-2 rtl:space-x-reverse'>
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>جاري الإرسال...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                        <span>{t('Send_a_Message') || 'إرسال الرسالة'}</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column - Contact Info & Map */}
                            <div className='space-y-8 bg-white rounded-3xl p-8'>
                                {/* Contact Info Cards */}
                                <div className='space-y-6'>
                                    <div className='flex items-center space-x-6 rtl:space-x-reverse p-8 bg-white rounded-2xl shadow-soft'>
                                        <div className='w-16 h-16 bg-brandRed/10 text-brandRed rounded-2xl flex items-center justify-center flex-shrink-0'>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className='text-lg text-gray-500 font-medium'>{t('Phone_Number')}</h3>
                                            <p className={`text-2xl font-bold text-fujiBlue ${isRTL ? 'font-cairo' : ''}`}>
                                                {isRTL ? '1015 956 54 966+' : '+966 54 956 1015'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-6 rtl:space-x-reverse p-8 bg-white rounded-2xl shadow-soft'>
                                        <div className='w-16 h-16 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center flex-shrink-0'>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className='text-lg text-gray-500 font-medium'>{t('Email')}</h3>
                                            <p className='text-2xl font-bold text-fujiBlue'>info@fujifd-ksa.com</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-6 rtl:space-x-reverse p-8 bg-white rounded-2xl shadow-soft'>
                                        <div className='w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className='text-lg text-gray-500 font-medium'>{t('Map_Street')}</h3>
                                            <p className='text-2xl font-bold text-fujiBlue'>{t('District_Name')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Button */}
                                <button
                                    onClick={() => window.open('https://wa.me/966549561015', '_blank')}
                                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 rtl:space-x-reverse"
                                >
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
                                    </svg>
                                    <span className='text-lg'>تواصل عبر WhatsApp</span>
                                </button>

                                {/* Map */}
                                <div className='bg-white rounded-3xl shadow-strong overflow-hidden'>
                                    <iframe
                                        className='w-full h-80'
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.2891234567!2d39.1234567!3d21.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1234567%3A0x1234567890abcdef!2sFUJI%20FD!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="FUJI FD Location"
                                    />
                                </div>

                                {/* Google Reviews Link - Desktop */}
                                <div className='bg-white rounded-3xl shadow-strong p-6'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center'>
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-bold text-fujiBlue ${isRTL ? 'font-cairo' : ''}`}>
                                                    {isRTL ? 'تقييمات جوجل' : 'Google Reviews'}
                                                </h3>
                                                <p className={`text-sm text-gray-500 ${isRTL ? 'font-cairo' : ''}`}>
                                                    {isRTL ? 'اطلع على تقييمات عملائنا' : 'See what our clients say'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <a
                                        href="https://maps.app.goo.gl/H6pFwFFmnDB6dZhV7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${isRTL ? 'font-cairo' : ''}`}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                        {isRTL ? 'عرض على خرائط جوجل' : 'View on Google Maps'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <StickyWhatsAppIcon />
        </>
    )
}

export default ContactUs