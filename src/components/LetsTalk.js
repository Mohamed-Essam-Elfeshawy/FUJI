import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const LetsTalk = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        subject: '',
        message: ''
    });

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
            // Use emailjs to send the form data
            await emailjs.send('service_5yyfaqj', 'template_jmewn0n', formData, '-Dqp5Ia1jl6qhAYVT');
            alert(isRTL ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
            setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' });
        } catch (error) {
            console.log('FAILED...', error);
            alert(isRTL ? "فشل في إرسال الرسالة." : "Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-midnight py-16 lg:py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-brandRed rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-brandBlue rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-brandRed to-brandBlue rounded-full filter blur-3xl opacity-50"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                    
                    {/* Left Column - Content & Image */}
                    <div className={`${isRTL ? 'lg:col-start-2 text-right' : 'text-left'} relative`}>
                        <div className="mb-12">
                            <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'لنتحدث عن مشروعك' : "Let's Talk About Your Project"}
                            </h2>
                            <p className={`text-xl text-gray-300 leading-relaxed mb-8 ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL 
                                    ? 'هل تحتاج إلى مساعدة؟ تواصل معنا وسنكون سعداء لمساعدتك في تحقيق رؤيتك'
                                    : 'Need help? Get in touch with us and we\'ll be happy to help you bring your vision to life'
                                }
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-6">
                            {[
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    ),
                                    titleEN: "Call Us",
                                    titleAR: "اتصل بنا",
                                    valueEN: "+966 53 422 3238",
                                    valueAR: "+966 53 422 3238"
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ),
                                    titleEN: "Email Us",
                                    titleAR: "راسلنا",
                                    valueEN: "info@quaddimensions.com",
                                    valueAR: "info@quaddimensions.com"
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ),
                                    titleEN: "Visit Us",
                                    titleAR: "زورنا",
                                    valueEN: "Jeddah, Saudi Arabia",
                                    valueAR: "جدة، المملكة العربية السعودية"
                                }
                            ].map((contact, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                                    <div className="w-12 h-12 bg-brandRed rounded-xl flex items-center justify-center text-white">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h4 className={`text-white font-semibold ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? contact.titleAR : contact.titleEN}
                                        </h4>
                                        <p className={`text-gray-300 ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? contact.valueAR : contact.valueEN}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className={`${isRTL ? 'lg:col-start-1' : ''}`}>
                        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
                                    <div>
                                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {isRTL ? 'الاسم الأول' : 'First Name'}
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
                                            placeholder={isRTL ? 'أدخل اسمك الأول' : 'Enter your first name'}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {isRTL ? 'اسم العائلة' : 'Last Name'}
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
                                            placeholder={isRTL ? 'أدخل اسم العائلة' : 'Enter your last name'}
                                        />
                                    </div>
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
                                    <div>
                                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
                                            placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                            {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                                        </label>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
                                            placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {isRTL ? 'الموضوع' : 'Subject'}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
                                        placeholder={isRTL ? 'أدخل موضوع الرسالة' : 'Enter message subject'}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                                        {isRTL ? 'الرسالة' : 'Message'}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-brandRed focus:ring-4 focus:ring-brandRed/20 transition-all duration-300 resize-none ${isRTL ? 'font-cairo text-right' : ''}`}
                                        placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full px-8 py-4 bg-gradient-to-r from-brandRed to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isRTL ? 'font-cairo' : ''}`}
                                >
                                    {isSubmitting 
                                        ? (isRTL ? 'جاري الإرسال...' : 'Sending...') 
                                        : (isRTL ? 'إرسال الرسالة' : 'Send Message')
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LetsTalk