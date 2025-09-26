import React from 'react'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import Analytics from '../components/Analytics'
import PerformanceOptimizer from '../components/PerformanceOptimizer'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ProductSlider from '../components/ProductSlider'
import ProductGrid from '../components/ProductGrid'
import OurServices from '../components/OurServices'
import Elevators from '../components/Elevators'
import Safety from '../components/Safety'
import OurDesigns from '../components/OurDesigns'
import OurClients from '../components/OurClients'
import WhyChooseUs from '../components/WhyChooseUs'
import LetsTalk from '../components/LetsTalk'
import StickyWhatsAppIcon from '../components/StickyWhatsAppIcon'
import SimplePromotionalModal from '../components/SimplePromotionalModal'
import { useTranslation } from 'react-i18next'
import cookies from "js-cookie"

const MainLayout = () => {
    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'ar';
    const isRTL = currentLanguageCode === 'ar';

    return (
        <div className="min-h-screen">
            <SEO 
                title={isRTL ? 'الصفحة الرئيسية' : 'Home'}
                description={isRTL 
                    ? 'شركة FUJI FD الرائدة في مجال المصاعد بالمملكة العربية السعودية. نقدم خدمات التركيب والصيانة والتحديث والاستشارات الفنية لجميع أنواع المصاعد مع ضمان الجودة والخبرة العالية.'
                    : 'FUJI FD is the leading elevator company in Saudi Arabia. We provide installation, maintenance, modernization, and technical consultation services for all types of elevators with guaranteed quality and high expertise.'
                }
                keywords={isRTL
                    ? 'FUJI FD, مصاعد السعودية, تركيب مصاعد, صيانة مصاعد, مصاعد بانورامية, مصاعد بدون تروس, مصاعد جدة, مصاعد الرياض'
                    : 'FUJI FD, Saudi Arabia elevators, elevator installation, elevator maintenance, panoramic elevators, gearless elevators, Jeddah elevators, Riyadh elevators'
                }
                url="https://www.fujifd-ksa.com"
            />
            <StructuredData type="organization" />
            <StructuredData type="localBusiness" />
            <StructuredData type="website" />
            <Analytics />
            <PerformanceOptimizer />
            <Hero />
            <ProductSlider />
            <ProductGrid />

            <div id='ourServices'>
                <OurServices />
            </div>
            <Elevators />
            <Safety />
            <OurDesigns />
            <OurClients />
            <WhyChooseUs />
            <LetsTalk />
            <Footer />
            <StickyWhatsAppIcon />
            <SimplePromotionalModal />
        </div>
    )
}

export default MainLayout