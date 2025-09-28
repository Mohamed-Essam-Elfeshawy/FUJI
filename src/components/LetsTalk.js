import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import cookies from "js-cookie";

const LetsTalk = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ open: false, type: 'success', text: '' });

    // Notification sound (matches ContactUs tone and intensity)
    const playToastSound = (type = 'success') => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const master = ctx.createGain();
            master.gain.value = 0.12; // same volume as ContactUs
            master.connect(ctx.destination);

            const playTone = (freq, start, dur, pan = 0) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const panner = (ctx.createStereoPanner ? ctx.createStereoPanner() : null);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
                gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + start + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
                if (panner) { panner.pan.setValueAtTime(pan, ctx.currentTime + start); osc.connect(gain); gain.connect(panner); panner.connect(master); }
                else { osc.connect(gain); gain.connect(master); }
                osc.start(ctx.currentTime + start);
                osc.stop(ctx.currentTime + start + dur + 0.02);
            };

            if (type === 'success') { playTone(880, 0, 0.18, -0.2); playTone(1320, 0.12, 0.22, 0.2); }
            else if (type === 'info') { playTone(988, 0, 0.22, 0); }
            else { playTone(660, 0, 0.18, 0.1); playTone(440, 0.12, 0.22, -0.1); }

            setTimeout(() => { try { ctx.close(); } catch (e) {} }, 600);
        } catch (e) {}
    };

    const showToast = (text, type = 'success') => {
        setToast({ open: true, type, text });
        playToastSound(type);
        setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2000);
    };

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
            showToast(t('Success_Message_Sent'), 'success');
            setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' });
        } catch (error) {
            console.log('FAILED...', error);
            showToast(t('Error_Generic_With_Email'), 'error');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
            {toast.open && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4">
                    <div
                        className={
                            `flex items-center gap-3 rounded-2xl border p-5 shadow-2xl ring-1 ring-black/10 transition-all duration-300 ` +
                            (toast.type === 'success'
                                ? 'bg-green-600 border-green-700 text-white'
                                : toast.type === 'info'
                                ? 'bg-blue-600 border-blue-700 text-white'
                                : 'bg-red-600 border-red-700 text-white')
                        }
                        role="status"
                        aria-live="polite"
                    >
                        {toast.type === 'success' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {toast.type === 'info' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M12 8v8m0 4a9 9 0 110-18 9 9 0 010 18z" />
                            </svg>
                        )}
                        <div className={`flex-1 text-center text-base font-bold text-white ${isRTL ? 'font-cairo' : ''}`}>{toast.text}</div>
                        <button
                            onClick={() => setToast((prev) => ({ ...prev, open: false }))}
                            className="ml-3 inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white w-8 h-8"
                            aria-label={t('Close')}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-72 h-72 bg-fuji-accent rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuji-blue rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-fuji-accent to-fuji-blue rounded-full filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
                    
                    {/* Left Column - Content & Image */}
                    <div className={`${isRTL ? 'lg:col-start-2 text-right' : 'text-left'} relative`}>
                        <div className="mb-12">
                            <h2 className={`text-4xl lg:text-5xl font-bold text-fuji-blue mb-6 leading-tight ${isRTL ? 'font-cairo' : ''}`}>
                                {isRTL ? 'لنتحدث عن مشروعك' : "Let's Talk About Your Project"}
                            </h2>
                            <p className={`text-xl text-fuji-muted leading-relaxed mb-8 ${isRTL ? 'font-cairo' : ''}`}>
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
                                    valueEN: "+966 54 956 1015",
                                    valueAR: "1015 956 54 966+"
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ),
                                    titleEN: "Email Us",
                                    titleAR: "راسلنا",
                                    valueEN: "info@fujifd-ksa.com",
                                    valueAR: "info@fujifd-ksa.com"
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
                                    valueEN: "Saudi Arabia",
                                    valueAR: "المملكة العربية السعودية"
                                }
                            ].map((contact, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-fuji-surface backdrop-blur-md rounded-2xl border border-gray-200 hover:bg-white hover:shadow-soft transition-all duration-300">
                                    <div className="w-12 h-12 bg-fuji-accent rounded-xl flex items-center justify-center text-white">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h4 className={`text-fuji-blue font-semibold ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? contact.titleAR : contact.titleEN}
                                        </h4>
                                        <p className={`text-fuji-muted ${isRTL ? 'font-cairo' : ''}`}>
                                            {isRTL ? contact.valueAR : contact.valueEN}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className={`${isRTL ? 'lg:col-start-1' : ''}`}>
                        <div className="bg-white backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-strong border border-gray-200">
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
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
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
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
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
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
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
                                            className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
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
                                        className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 ${isRTL ? 'font-cairo text-right' : ''}`}
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
                                        className={`w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuji-accent focus:ring-4 focus:ring-fuji-accent/20 transition-all duration-300 resize-none ${isRTL ? 'font-cairo text-right' : ''}`}
                                        placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full px-8 py-4 bg-gradient-to-r from-fuji-accent to-fuji-accent-red hover:from-fuji-accent-red hover:to-red-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isRTL ? 'font-cairo' : ''}`}
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