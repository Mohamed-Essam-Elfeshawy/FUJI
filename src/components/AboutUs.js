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
    return (
        <>
            {/* Mobile */}
            <div className='block md:hidden'>
                <Navbar />
                <div className='flex flex-col pt-28 pb-[100px] px-4'>

                    {/* About Us Section */}
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='bg-[#9FB5C1] py-2 rounded-full px-6 text-[14px] text-[#3C4C59] font-medium'>{t('About_Us')}</h1>
                        <h1 className='text-[24px] text-[#3C4C59] font-semibold mt-4 mb-2'>{t('Rise_to_new_heights')}</h1>
                        <h1 className='text-[14px] text-[#6B7984]'>{t('About_Us_Title_Long_Text')}</h1>
                    </div>

                    {/* Mission Section */}
                    <div className='flex flex-col items-center mt-12 mb-12'>
                        <div className='w-full h-[200px] mb-6'>
                            <img className='object-cover object-center w-full h-full bg-[#C4C4C4] rounded-[20px]' src={elevator_about_us_02} alt='our_Mission_img' />
                        </div>
                        <div className='text-center'>
                            <h1 className='text-[14px] text-[#708FA0] font-semibold'>{t('Our_Mission')}</h1>
                            <h1 className='text-[20px] text-[#333D46] font-bold mt-3 mb-4'>{t('Our_Mission_Title')}</h1>
                            <p className='text-[12px] text-[#9FB5C1] font-normal' dangerouslySetInnerHTML={{ __html: t('Our_Mission_Long_Text') }}></p>
                        </div>
                    </div>

                    {/* Vision Section */}
                    <div className='flex flex-col items-center mt-12 mb-12'>
                        <div className='w-full h-[200px] mb-6'>
                            <img className='bg-[#C4C4C4] object-cover object-center w-full h-full rounded-[20px]' src={our_Vision_img_option_01} alt='our_Vision_img' />
                        </div>
                        <div className='text-center'>
                            <h1 className='text-[14px] text-[#708FA0] font-semibold'>{t('OUR_VISSION')}</h1>
                            <h1 className='text-[20px] text-[#333D46] font-bold mt-3 mb-4'>{t('OUR_VISSION_Title')}</h1>
                            <p className='text-[12px] text-[#9FB5C1] font-normal'>{t('OUR_VISSION_Text')}</p>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>

            {/* Desktop */}
            <div className='hidden md:block'>
                <Navbar />
                <div className='flex flex-col pt-28 mb-[320px]'>

                    <div className='flex flex-col items-center '>
                        <h1 className='bg-[#9FB5C1] py-[16px] rounded-[50px] px-[43px] text-[16px] text-[#3C4C59] font-medium'>{t('About_Us')}</h1>
                        <h1 className='text-[40px] text-[#3C4C59] font-semibold mt-[16px] mb-[8px]'>{t('Rise_to_new_heights')}</h1>
                        <h1>{t('About_Us_Title_Long_Text')}</h1>
                    </div>

                    <div className='grid grid-cols-2 items-center ms-[100px] mt-[89px] mb-[116px] gap-[100px]'>
                        <div className='w-[598.35px] h-[448px]'>
                            <img className=' object-cover object-center w-full h-full bg-[#C4C4C4] rounded-[30px]' src={elevator_about_us_02} alt='our_Mission_img' />
                        </div>
                        <div className='flex flex-col w-fit '>
                            <h1 className='text-[16px] text-[#708FA0] font-semibold'>{t('Our_Mission')}</h1>
                            <h1 className='text-[32px] text-[#333D46] font-bold mt-[13px] mb-[26px]'>{t('Our_Mission_Title')}</h1>
                            <p className='text-[16px] text-[#9FB5C1] pe-20 font-normal ' dangerouslySetInnerHTML={{ __html: t('Our_Mission_Long_Text') }}></p>
                        </div>
                    </div>

                    <div className='relative flex justify-start w-full h-[541px] bg-[#F3F7F8] items-center ps-[100px] mt-[89px] mb-[116px] gap-[50px]'>

                        <div className='flex flex-col '>
                            <h1 className='text-[16px] text-[#708FA0] font-semibold'>{t('OUR_VISSION')}</h1>
                            <h1 className='text-[32px] text-[#333D46] font-bold mt-[13px] mb-[26px]'>{t('OUR_VISSION_Title')}</h1>
                            <p className='text-[16px] w-[450px] text-[#9FB5C1] font-normal '>{t('OUR_VISSION_Text')}</p>
                        </div>

                        <div className='absolute end-[80px] -bottom-[143px]'>
                            <div className='w-[598.35px] h-[448px]'>
                                <img className=' bg-[#C4C4C4] object-cover object-left-bottom  w-full h-full rounded-[30px]' src={our_Vision_img_option_01} alt='our_Vision_img' />
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