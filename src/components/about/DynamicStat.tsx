
"use client";

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Stat {
    label: string;
    value: number;
    suffix: string;
}

interface DynamicStatProps {
    stat: Stat;
}

export default function DynamicStat({ stat }: DynamicStatProps) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = stat.value;
            if (start === end) return;

            const duration = 1500;
            const incrementTime = (duration / end);
            
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) {
                    clearInterval(timer);
                }
            }, incrementTime);
            
            return () => clearInterval(timer);
        }
    }, [inView, stat.value]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center">
            <h3 className="font-headline text-4xl md:text-5xl font-bold">
                {count}{stat.suffix}
            </h3>
            <p className="text-sm uppercase tracking-widest mt-2">{stat.label}</p>
        </div>
    );
}
