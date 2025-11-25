import React from 'react';
import cookies from "js-cookie";

const StickyWhatsAppIcon = () => {
    const currentLanguageCode = cookies.get('i18next');
    const isRTL = currentLanguageCode === 'ar';
    const labelText = isRTL ? 'تواصل معنا' : 'Contact us';
    return (
        <a
            href="https://wa.me/966549561015" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp"
            className={`fixed bottom-3 ${currentLanguageCode === 'en' ? 'right-3' : 'left-3'} z-50`}
        >
            <div className="relative group">
                {/* Local styles for heartbeat animation */}
                <style>{`
                  @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    40% { transform: scale(1.12); }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .heartbeat { animation: none !important; }
                  }
                `}</style>

                {/* Hover tooltip (bubble) */}
                <div className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-600 text-white text-[10px] sm:text-[11px] font-medium px-2.5 py-[3px] rounded-full shadow-md ring-1 ring-white/10 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ${isRTL ? 'font-cairo' : ''}`}>
                    {labelText}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-green-600" />
                </div>

                {/* Pulse halo */}
                <span className="absolute inset-0 -m-1 rounded-full bg-green-500/40 animate-pulse" aria-hidden="true"></span>

                {/* Button */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full shadow-xl ring-1 ring-black/10 bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center text-white">
                    <i className="fa-brands fa-whatsapp text-base sm:text-xl md:text-2xl heartbeat" style={{ animation: 'heartbeat 1.6s ease-in-out infinite' }} aria-hidden="true"></i>
                </div>
            </div>
        </a>
    );
};

export default StickyWhatsAppIcon;

