import React, { useState, useEffect } from 'react';

const TypewriterAnimation = ({ 
    text, 
    speed = 100, 
    delay = 0, 
    className = '',
    onComplete = () => {}
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!isStarted || currentIndex >= text.length) {
            if (currentIndex >= text.length) {
                onComplete();
            }
            return;
        }

        const timer = setTimeout(() => {
            setDisplayedText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timer);
    }, [currentIndex, text, speed, isStarted]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default TypewriterAnimation;
