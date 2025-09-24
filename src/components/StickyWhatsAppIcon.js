import React from 'react';
import whatsappIcon from '../images/StickyWhatsAppIcon/whatsapp.png'; // Adjust the path to your image file
import cookies from "js-cookie";

const StickyWhatsAppIcon = () => {
    const currentLanguageCode = cookies.get('i18next');
    return (
        <a
            href="https://wa.me/966549561015" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-2 ${currentLanguageCode === 'en' ? 'right-2' : 'left-2'}  z-20 shadow-lg`}
        >
            <img
                src={whatsappIcon}
                alt="WhatsApp Icon"
                className="w-16 h-16"
            />
        </a>
    );
};

export default StickyWhatsAppIcon;
