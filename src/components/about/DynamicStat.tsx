"use client";

import { useState, useEffect, useRef } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface DynamicStatProps {
  stat: Stat;
}

export default function DynamicStat({ stat }: DynamicStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = stat.value;
      if (start === end) return;

      const duration = 1500; // 1.5 seconds
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
    <div ref={ref}>
      <p className="text-sm uppercase tracking-widest flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 bg-primary-foreground/80 rounded-full"></span>
        {stat.label}
      </p>
      <p className="text-5xl font-bold mt-2">
        {count}
        {stat.suffix}
      </p>
    </div>
  );
}
