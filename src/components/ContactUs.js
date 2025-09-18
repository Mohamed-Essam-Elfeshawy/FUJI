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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use emailjs to send the form data
        emailjs.send('service_5yyfaqj', 'template_jmewn0n', formData, '-Dqp5Ia1jl6qhAYVT')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert("Email sent successfully!");
            }, (err) => {
                console.log('FAILED...', err);
                alert("Email sending failed.");
            });
        setFormData({ firstName: '', lastName: '', phoneNumber: '', emailAddress: '', subject: '', message: '' })
    };

    return (
        <>
            {/* Mobile */}
            <div className='md:hidden'>
                <Navbar />
                <div className='flex flex-col pt-28 mb-16 text-[12px] font-normal px-4'>

                    <div>
                        {/* <iframe
                            className='h-72 w-full rounded-lg'
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3713.118462353725!2d39.934239999999996!3d21.463868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI3JzQ5LjkiTiAzOcKwNTYnMDMuMyJF!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe> */}
                    </div>
                    <div className='flex flex-col mt-8 text-gray-900'>
                        <h1 className='text-gray-900 text-[24px] font-semibold'>{t('Lets_talk_about_your_project')}</h1>
                        <h1 className='text-gray-600 text-[14px] font-normal mt-4 mb-6'>{t('need_help')}</h1>

                        <form className='text-gray-900' onSubmit={handleSubmit}>

                            <div className="flex flex-col mb-4">
                                <label>{t('First_Name')}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder={t('First_Name')}
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label>{t('Last_Name')}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder={t('Last_Name')}
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label>{t('Phone_Number')}</label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder={t('Phone_Number')}
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label>{t('Email')}</label>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    placeholder={t('Email')}
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label>{t('Subject')}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder={t('Subject')}
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                />
                            </div>

                            <div className="flex flex-col mb-6">
                                <label>{t('Message')}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('Message')}
                                    rows="4"
                                    className="mt-2 py-2 px-3 border text-gray-700 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"

                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-primary hover:bg-primaryDark text-white rounded-xl font-semibold transition-all duration-300 shadow-medium hover:shadow-strong"
                            >
                                {t('Send_a_Message')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center my-8'>
                    <h1 className='text-gray-900 text-[28px] font-semibold text-center'>{t('Get_in_Touch')}</h1>
                    <p className='text-gray-600 text-[14px] text-center font-normal mt-2 mb-6'>{t('get_in_touch_long_text')}</p>

                    <div className='flex flex-col gap-6 items-center w-full px-4'>

                        <div className='flex items-center gap-4 w-full'>
                            <div className='bg-secondary rounded-full py-4 px-4'>
                                <img src={call_icon} className='w-6 h-6' alt='call icon' />
                            </div>
                            <div>
                                <h1 className='text-gray-500 text-[12px]'>{t('Phone_Number')}</h1>
                                <h1 className='text-gray-900 text-[16px] font-bold'>053-422-3238</h1>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 w-full'>
                            <div className='bg-secondary rounded-full py-4 px-4'>
                                <img src={email_icon} className='w-6 h-6' alt='email icon' />
                            </div>
                            <div>
                                <h1 className='text-gray-500 text-[12px]'>{t('Email')}</h1>
                                <h1 className='text-gray-900 text-[16px] font-bold'>info@quad-dimensions.com</h1>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 w-full'>
                            <div className='bg-secondary rounded-full py-4 px-4'>
                                <img src={location_icon} className='w-6 h-6' alt='location icon' />
                            </div>
                            <div>
                                <h1 className='text-gray-500 text-[12px]'>{t('Map_Street')}</h1>
                                <h1 className='text-gray-900 text-[16px] font-bold'>{t('District_Name')}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Desktop */}
            <div className='hidden md:block'>
                <Navbar />
                <div className='grid grid-cols-2 pt-28 mb-32 text-[14px] font-normal'>
                    <div>
                        {/* <iframe className='h-full w-full' src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3713.118462353725!2d39.934239999999996!3d21.463868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDI3JzQ5LjkiTiAzOcKwNTYnMDMuMyJF!5e0!3m2!1sen!2ssa!4v1726137600355!5m2!1sen!2ssa" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    </div>
                    <div className='page-2 flex flex-col px-[86px] pt-[51px] text-[#333D46] '>
                        <h1 className='text-[#333D46] text-[48px] font-semibold'>{t('Lets_talk_about_your_project')}</h1>
                        <h1 className='text-[#9FB5C1] text-[16px] font-normal mt-4 mb-8'>{t('need_help')}</h1>

                        <form className='text-[#333D46]' onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 mb-4 gap-5">
                                <div className='flex flex-col w-full'>
                                    <label>{t('First_Name')}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder={t('First_Name')}
                                        className="mt-2 py-3 px-4 border text-[#515978] border-gray-300 rounded-[12px] focus:outline-none placeholder-[#515978]"
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label>{t('Last_Name')}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder={t('Last_Name')}
                                        className="mt-2 py-3 px-4 border text-[#515978] border-gray-300  rounded-[12px] focus:outline-none placeholder-[#515978]"
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label>{t('Phone_Number')}</label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder={t('Phone_Number')}
                                        className="mt-2 py-3 px-4 border text-[#515978] border-gray-300  rounded-[12px] focus:outline-none placeholder-[#515978]"
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label>{t('Email')}</label>
                                    <input
                                        type="email"
                                        name="emailAddress"
                                        value={formData.emailAddress}
                                        onChange={handleChange}
                                        placeholder={t('Email')}
                                        className="mt-2 py-3 px-4 border text-[#515978] border-gray-300  rounded-[12px] focus:outline-none placeholder-[#515978]"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>{t('Subject')}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder={t('Subject')}
                                    className="w-full mt-2 py-3 px-4 border text-[#515978] border-gray-300 rounded-[12px] focus:outline-none placeholder-[#515978]"
                                />
                            </div>

                            <div className="mb-8">
                                <label>{t('Message')}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('Message')}
                                    rows="5"
                                    className="w-full mt-2 py-3 px-4 border text-[#515978] border-gray-300  rounded-[12px] focus:outline-none placeholder-[#515978]"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="px-11 py-3 mb-11 bg-[#3C4C59] text-white rounded-[12px] hover:bg-[#4d5f6d] focus:outline-none"
                            >
                                {t('Send_a_Message')}
                            </button>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-[#333D46] text-[56px] font-semibold'>{t('Get_in_Touch')}</h1>
                    <p className='text-[#9FB5C1] text-[20px] text-center font-normal> mt-4 mb-11'>{t('get_in_touch_long_text')}</p>

                    <div className='flex justify-center items-center gap-[138px] mb-[195px]'>

                        <div className='flex items-center gap-4'>
                            <div className='bg-[#708FA0] rounded-full py-[20px] px-[20px]'>
                                <img src={call_icon} className=' w-[24px] h-[24px]' alt='call icon' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[#77808B] text-[16px]'>{t('Phone_Number')}</h1>
                                <div>
                                    <h1 className='text-[#283646] text-[24px] font-bold'>053-422-3238</h1>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className='bg-[#708FA0] rounded-full py-[20px] px-[20px]'>
                                <img src={email_icon} className=' w-[24px] h-[24px]' alt='email icon' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[#77808B] text-[16px]'>{t('Email')}</h1>
                                <h1 className='text-[#283646] text-[24px] font-bold'>info@quad-dimensions.com</h1>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className='bg-[#708FA0] rounded-full py-[20px] px-[20px]'>
                                <img src={location_icon} className=' w-[24px] h-[24px]' alt='location icon' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-[#77808B] text-[16px]'>{t('Map_Street')}</h1>
                                <h1 className='text-[#283646] text-[24px] font-bold'>{t('District_Name')}</h1>
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