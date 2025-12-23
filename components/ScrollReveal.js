'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, animation = 'fade-up', delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const getTransform = () => {
        if (!isVisible) {
            switch (animation) {
                case 'fade-up': return 'translateY(30px)';
                case 'fade-left': return 'translateX(-30px)';
                case 'fade-right': return 'translateX(30px)';
                case 'zoom-in': return 'scale(0.9)';
                default: return 'none';
            }
        }
        return 'none';
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
            }}
        >
            {children}
        </div>
    );
}
