import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AnimateOnScroll = ({ 
    children, 
    className = '', 
    animation = 'fadeUp',
    delay = 0,
    duration = 600
}) => {
    const [ref, isVisible] = useScrollAnimation({
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    });

    const getAnimationClasses = () => {
        const baseClasses = `transition-all ease-out`;
        const durationClass = `duration-${duration}`;
        
        if (!isVisible) {
            switch (animation) {
                case 'fadeUp':
                    return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
                case 'fadeDown':
                    return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
                case 'fadeLeft':
                    return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
                case 'fadeRight':
                    return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
                case 'scale':
                    return `${baseClasses} ${durationClass} opacity-0 scale-95`;
                case 'slideUp':
                    return `${baseClasses} ${durationClass} opacity-0 translate-y-16`;
                case 'slideDown':
                    return `${baseClasses} ${durationClass} opacity-0 -translate-y-16`;
                case 'slideLeft':
                    return `${baseClasses} ${durationClass} opacity-0 translate-x-16`;
                case 'slideRight':
                    return `${baseClasses} ${durationClass} opacity-0 -translate-x-16`;
                case 'zoomIn':
                    return `${baseClasses} ${durationClass} opacity-0 scale-50`;
                case 'zoomOut':
                    return `${baseClasses} ${durationClass} opacity-0 scale-150`;
                case 'rotate':
                    return `${baseClasses} ${durationClass} opacity-0 rotate-12 scale-95`;
                default:
                    return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
            }
        }
        
        return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
    };

    const style = {
        transitionDelay: `${delay}ms`
    };

    return (
        <div 
            ref={ref} 
            className={`${getAnimationClasses()} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default AnimateOnScroll;
