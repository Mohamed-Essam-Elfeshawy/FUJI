import { useTranslation } from 'react-i18next';
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyWhatsAppIcon from './StickyWhatsAppIcon'
import our_Mission_img from '../images/AboutUs/our_Mission_img.jpg'
import our_Vision_img from '../images/AboutUs/our_Vision_img.jpg'
import our_Vision_img_option_01 from '../images/AboutUs/our_Vision_img_option_01.jpg'
import elevator_about_us_01 from '../images/AboutUs/elevator_about_us_01.jpg'
import elevator_about_us_02 from '../images/AboutUs/elevator_about_us_02.jpeg'

const AboutUs = () => {
    const { t } = useTranslation();
    
    const keyHighlights = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: t('Innovation_Excellence') || 'Innovation Excellence',
            description: t('Innovation_Description') || 'Cutting-edge elevator technology'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t('Quality_Assurance') || 'Quality Assurance',
            description: t('Quality_Description') || 'Premium materials and craftsmanship'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: t('Expert_Team') || 'Expert Team',
            description: t('Team_Description') || 'Skilled professionals with years of experience'
        }
    ];

    return (
        <>
            {/* Mobile */}
            <div className='block lg:hidden'>
                <Navbar />
                <div className='pt-28 pb-16 px-4'>
                    {/* Hero Section */}
                    <div className='text-center mb-12'>
                        <span className='inline-block bg-brandRed/10 text-brandRed px-6 py-2 rounded-full text-sm font-semibold mb-4'>
                            {t('About_Us')}
                        </span>
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                            {t('Rise_to_new_heights')}
                        </h1>
                        <p className='text-gray-600 text-base leading-relaxed'>
                            {t('About_Us_Title_Long_Text')}
                        </p>
                    </div>

                    {/* Key Highlights */}
                    <div className='mb-16'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>Why Choose Us</h2>
                        <div className='space-y-6'>
                            {keyHighlights.map((highlight, index) => (
                                <div key={index} className='flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-soft border border-gray-100'>
                                    <div className='flex-shrink-0 w-12 h-12 bg-brandRed/10 text-brandRed rounded-xl flex items-center justify-center'>
                                        {highlight.icon}
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{highlight.title}</h3>
                                        <p className='text-gray-600 text-sm'>{highlight.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className='bg-gradient-to-br from-brandRed to-red-600 rounded-3xl p-8 text-white mb-8 shadow-strong'>
                        <div className='text-center mb-6'>
                            <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className='text-xl font-bold mb-2'>{t('Our_Mission')}</h3>
                            <h4 className='text-lg font-semibold mb-4'>{t('Our_Mission_Title')}</h4>
                            <p className='text-white/90 leading-relaxed' dangerouslySetInnerHTML={{ __html: t('Our_Mission_Long_Text') }}></p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className='bg-gradient-to-br from-brandBlue to-blue-600 rounded-3xl p-8 text-white shadow-strong'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className='text-xl font-bold mb-2'>{t('OUR_VISSION')}</h3>
                            <h4 className='text-lg font-semibold mb-4'>{t('OUR_VISSION_Title')}</h4>
                            <p className='text-white/90 leading-relaxed'>{t('OUR_VISSION_Text')}</p>
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
                            {t('About_Us')}
                        </span>
                        <h1 className='text-5xl font-bold text-gray-900 mb-6'>
                            {t('Rise_to_new_heights')}
                        </h1>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            {t('About_Us_Title_Long_Text')}
                        </p>
                    </div>

                    {/* Two Column Layout - Brand Story & Image */}
                    <div className='max-w-7xl mx-auto px-8 mb-20'>
                        <div className='grid lg:grid-cols-2 gap-16 items-center'>
                            {/* Left Column - Content */}
                            <div className='space-y-8'>
                                <div>
                                    <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
                                    <p className='text-lg text-gray-600 leading-relaxed mb-8'>
                                        {t('About_Us_Title_Long_Text')}
                                    </p>
                                </div>

                                {/* Key Highlights */}
                                <div className='space-y-6'>
                                    {keyHighlights.map((highlight, index) => (
                                        <div key={index} className='flex items-start space-x-4'>
                                            <div className='flex-shrink-0 w-12 h-12 bg-brandRed/10 text-brandRed rounded-xl flex items-center justify-center'>
                                                {highlight.icon}
                                            </div>
                                            <div>
                                                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{highlight.title}</h3>
                                                <p className='text-gray-600'>{highlight.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Image */}
                            <div className='relative'>
                                <div className='aspect-[4/3] rounded-3xl overflow-hidden shadow-strong'>
                                    <img 
                                        className='w-full h-full object-cover' 
                                        src={elevator_about_us_02} 
                                        alt='About Us' 
                                    />
                                </div>
                                <div className='absolute -bottom-8 -left-8 w-32 h-32 bg-brandRed/10 rounded-3xl'></div>
                                <div className='absolute -top-8 -right-8 w-24 h-24 bg-brandBlue/10 rounded-2xl'></div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision Cards */}
                    <div className='max-w-7xl mx-auto px-8'>
                        <div className='grid lg:grid-cols-2 gap-8'>
                            {/* Mission Card */}
                            <div className='bg-gradient-to-br from-brandRed to-red-600 rounded-3xl p-12 text-white shadow-strong transform hover:scale-105 transition-transform duration-300'>
                                <div className='text-center'>
                                    <div className='w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className='text-2xl font-bold mb-3'>{t('Our_Mission')}</h3>
                                    <h4 className='text-xl font-semibold mb-6'>{t('Our_Mission_Title')}</h4>
                                    <p className='text-white/90 text-lg leading-relaxed' dangerouslySetInnerHTML={{ __html: t('Our_Mission_Long_Text') }}></p>
                                </div>
                            </div>

                            {/* Vision Card */}
                            <div className='bg-gradient-to-br from-brandBlue to-blue-600 rounded-3xl p-12 text-white shadow-strong transform hover:scale-105 transition-transform duration-300'>
                                <div className='text-center'>
                                    <div className='w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className='text-2xl font-bold mb-3'>{t('OUR_VISSION')}</h3>
                                    <h4 className='text-xl font-semibold mb-6'>{t('OUR_VISSION_Title')}</h4>
                                    <p className='text-white/90 text-lg leading-relaxed'>{t('OUR_VISSION_Text')}</p>
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

export default AboutUs