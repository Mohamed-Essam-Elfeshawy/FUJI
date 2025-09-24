import React from 'react';

const RiyalSymbol = ({ className = "w-5 h-5 inline-block", style = {} }) => {
    return (
        <svg 
            className={className}
            style={style}
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Gradient for professional look */}
                <linearGradient id="riyalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#146FB6" />
                    <stop offset="50%" stopColor="#1E88E5" />
                    <stop offset="100%" stopColor="#0D47A1" />
                </linearGradient>
                
                {/* Shadow effect */}
                <filter id="riyalShadow">
                    <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.2"/>
                </filter>
            </defs>
            
            {/* Professional Riyal Symbol Design */}
            <g fill="url(#riyalGradient)" filter="url(#riyalShadow)">
                {/* Main vertical lines with enhanced design */}
                <rect x="6" y="3" width="2.5" height="18" rx="1.25"/>
                <rect x="10" y="3" width="2.5" height="18" rx="1.25"/>
                
                {/* Horizontal connecting lines */}
                <rect x="3.5" y="7.5" width="9" height="2" rx="1"/>
                <rect x="3.5" y="11" width="7" height="2" rx="1"/>
                <rect x="3.5" y="14.5" width="9" height="2" rx="1"/>
                
                {/* Right side elements */}
                <rect x="14" y="5.5" width="5" height="2" rx="1"/>
                <rect x="14" y="9" width="7" height="2" rx="1"/>
                <rect x="14" y="12.5" width="5" height="2" rx="1"/>
                <rect x="14" y="16" width="4" height="2" rx="1"/>
            </g>
            
            {/* Highlight effects for more depth */}
            <g fill="#FFFFFF" opacity="0.3">
                <rect x="6.2" y="3.2" width="0.8" height="17.6" rx="0.4"/>
                <rect x="10.2" y="3.2" width="0.8" height="17.6" rx="0.4"/>
            </g>
        </svg>
    );
};

export default RiyalSymbol;
