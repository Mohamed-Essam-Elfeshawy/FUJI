import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ 
    children, 
    animation = 'fade-up', 
    delay = 0, 
    duration = 600,
    threshold = 0.1,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold,
                rootMargin: '50px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [delay, threshold]);

    const getAnimationClass = () => {
        const baseClass = 'transition-all duration-700 ease-out';
        
        if (!isVisible) {
            switch (animation) {
                case 'fade-up':
                    return `${baseClass} opacity-0 translate-y-8`;
                case 'fade-down':
                    return `${baseClass} opacity-0 -translate-y-8`;
                case 'fade-left':
                    return `${baseClass} opacity-0 translate-x-8`;
                case 'fade-right':
                    return `${baseClass} opacity-0 -translate-x-8`;
                case 'scale':
                    return `${baseClass} opacity-0 scale-95`;
                case 'rotate':
                    return `${baseClass} opacity-0 rotate-3 scale-95`;
                case 'slide-up':
                    return `${baseClass} opacity-0 translate-y-16`;
                case 'slide-left':
                    return `${baseClass} opacity-0 translate-x-16`;
                case 'slide-right':
                    return `${baseClass} opacity-0 -translate-x-16`;
                case 'zoom-in':
                    return `${baseClass} opacity-0 scale-50`;
                case 'zoom-out':
                    return `${baseClass} opacity-0 scale-150`;
                case 'flip-x':
                    return `${baseClass} opacity-0 rotateX-90`;
                case 'flip-y':
                    return `${baseClass} opacity-0 rotateY-90`;
                default:
                    return `${baseClass} opacity-0 translate-y-8`;
            }
        } else {
            return `${baseClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
        }
    };

    return (
        <div
            ref={elementRef}
            className={`${getAnimationClass()} ${className}`}
            style={{ transitionDuration: `${duration}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;
