import React from 'react'
import Navbar from './Navbar'
import call_icon from '../images/ContactUs/call_icon.png'
import email_icon from '../images/ContactUs/email_icon.png'
import location_icon from '../images/ContactUs/location_icon.png'
import Footer from './Footer'
import StickyWhatsAppIcon from './StickyWhatsAppIcon'
import emailjs from 'emailjs-com';
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ContactUs = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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
            alert("تم إرسال الرسالة بنجاح! / Email sent successfully!");
            setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' });
        } catch (err) {
            console.log('FAILED...', err);
            alert("فشل في إرسال الرسالة / Email sending failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Mobile */}
            <div className='lg:hidden'>
                <Navbar />
                <div className='pt-28 pb-16 px-4'>

                    {/* Hero Section */}
                    <div className='text-center mb-12'>
                        <span className='inline-block bg-brandRed/10 text-brandRed px-6 py-2 rounded-full text-sm font-semibold mb-4'>
                            {t('Get_in_Touch') || 'تواصل معنا'}
                        </span>
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                            {t('Lets_talk_about_your_project') || 'تواصل معنا الآن'}
                        </h1>
                        <p className='text-gray-600 text-base leading-relaxed'>
                            {t('need_help') || 'نحن هنا لمساعدتك في مشروعك'}
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className='bg-white rounded-3xl shadow-strong p-8 mb-12'>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className='grid grid-cols-1 gap-6'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('First_Name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder={t('First_Name')}
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('Last_Name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder={t('Last_Name')}
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('Email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="emailAddress"
                                        value={formData.emailAddress}
                                        onChange={handleChange}
                                        placeholder={t('Email')}
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('Phone_Number')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder={t('Phone_Number')}
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('Subject')}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder={t('Subject')}
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                        {t('Message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('Message')}
                                        rows="5"
                                        className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-brandRed to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'جاري الإرسال...' : (t('Send_a_Message') || 'إرسال الرسالة')}
                            </button>
                        </form>
                    </div>
                    {/* Contact Info */}
                    <div className='space-y-6'>
                        <div className='flex items-center space-x-4 rtl:space-x-reverse p-6 bg-white rounded-2xl shadow-soft'>
                            <div className='w-12 h-12 bg-brandRed/10 text-brandRed rounded-xl flex items-center justify-center flex-shrink-0'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm text-gray-500 font-medium'>{t('Phone_Number')}</h3>
                                <p className='text-lg font-bold text-gray-900'>012-010-29395</p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-soft'>
                            <div className='w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-xl flex items-center justify-center flex-shrink-0'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm text-gray-500 font-medium'>{t('Email')}</h3>
                                <p className='text-lg font-bold text-gray-900'>info@quad-dimensions.com</p>
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
                                <p className='text-lg font-bold text-gray-900'>{t('District_Name')}</p>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <button
                            onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                            </svg>
                            <span>WhatsApp</span>
                        </button>

                        {/* Map */}
                        <div className='bg-white rounded-3xl shadow-strong overflow-hidden'>
                            <iframe
                                className='w-full h-64'
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3713.118462353725!2d39.934239999999996!3d21.463868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI3JzQ5LjkiTiAzOcKwNTYnMDMuMyJF!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Desktop */}
            <div className='hidden lg:block'>
                <Navbar />
                <div className='pt-28 pb-20'>
                    {/* Hero Section */}
                    <div className='max-w-7xl mx-auto px-8 text-center mb-20'>
                        <span className='inline-block bg-brandRed/10 text-brandRed px-8 py-3 rounded-full text-lg font-semibold mb-6'>
                            {t('Get_in_Touch') || 'تواصل معنا'}
                        </span>
                        <h1 className='text-5xl font-bold text-gray-900 mb-6'>
                            {t('Lets_talk_about_your_project') || 'تواصل معنا الآن'}
                        </h1>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            {t('need_help') || 'نحن هنا لمساعدتك في مشروعك'}
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className='max-w-7xl mx-auto px-8'>
                        <div className='grid lg:grid-cols-2 gap-16'>
                            {/* Left Column - Contact Form */}
                            <div className='bg-white rounded-3xl shadow-strong p-12'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-8'>إرسال رسالة / Send Message</h2>

                                <form onSubmit={handleSubmit} className='space-y-6'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                {t('First_Name')}
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder={t('First_Name')}
                                                className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                {t('Last_Name')}
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder={t('Last_Name')}
                                                className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                {t('Email')}
                                            </label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                value={formData.emailAddress}
                                                onChange={handleChange}
                                                placeholder={t('Email')}
                                                className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                {t('Phone_Number')}
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder={t('Phone_Number')}
                                                className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                            {t('Subject')}
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder={t('Subject')}
                                            className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                            {t('Message')}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t('Message')}
                                            rows="6"
                                            className="w-full py-4 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-brandRed transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-brandRed to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'جاري الإرسال...' : (t('Send_a_Message') || 'إرسال الرسالة')}
                                    </button>
                                </form>
                            </div>

                            {/* Right Column - Contact Info & Map */}
                            <div className='space-y-8'>
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
                                            <p className='text-2xl font-bold text-gray-900'>012-010-29395</p>
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
                                            <p className='text-2xl font-bold text-gray-900'>info@quad-dimensions.com</p>
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
                                            <p className='text-2xl font-bold text-gray-900'>{t('District_Name')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Button */}
                                <button
                                    onClick={() => window.open('https://wa.me/2001201029395', '_blank')}
                                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 rtl:space-x-reverse"
                                >
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                                    </svg>
                                    <span className='text-lg'>تواصل عبر WhatsApp</span>
                                </button>

                                {/* Map */}
                                <div className='bg-white rounded-3xl shadow-strong overflow-hidden'>
                                    <iframe
                                        className='w-full h-80'
                                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3713.118462353725!2d39.934239999999996!3d21.463868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI3JzQ5LjkiTiAzOcKwNTYnMDMuMyJF!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Location Map"
                                    />
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