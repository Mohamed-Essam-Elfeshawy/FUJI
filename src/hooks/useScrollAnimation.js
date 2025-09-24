import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px 0px -50px 0px',
        triggerOnce = true
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [elementRef, isVisible];
};

export default useScrollAnimation;
