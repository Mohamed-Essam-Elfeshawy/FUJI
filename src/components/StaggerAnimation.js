import React, { Children, cloneElement } from 'react';
import ScrollAnimation from './ScrollAnimation';

const StaggerAnimation = ({ 
    children, 
    staggerDelay = 200, 
    animation = 'fade-up',
    className = ''
}) => {
    const childrenArray = Children.toArray(children);

    return (
        <div className={className}>
            {childrenArray.map((child, index) => (
                <ScrollAnimation
                    key={index}
                    animation={animation}
                    delay={index * staggerDelay}
                    duration={600}
                >
                    {child}
                </ScrollAnimation>
            ))}
        </div>
    );
};

export default StaggerAnimation;
