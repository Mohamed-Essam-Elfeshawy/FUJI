import React from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ProductSlider from '../components/ProductSlider'
import OurServices from '../components/OurServices'
import Elevators from '../components/Elevators'
import Safety from '../components/Safety'
import OurDesigns from '../components/OurDesigns'
import OurClients from '../components/OurClients'
import WhyChooseUs from '../components/WhyChooseUs'
import LetsTalk from '../components/LetsTalk'
import StickyWhatsAppIcon from '../components/StickyWhatsAppIcon'

const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <ProductSlider />

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
        </div>
    )
}

export default MainLayout