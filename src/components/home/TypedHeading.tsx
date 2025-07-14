"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const words = ["Stack", "Glory", "Imagine"];

export default function TypedHeading() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);
  
  const timeoutRef = useRef(null);
  const blinkTimeoutRef = useRef(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (blinkTimeoutRef.current) {
      clearTimeout(blinkTimeoutRef.current);
      blinkTimeoutRef.current = null;
    }
  }, []);

  // Typing effect with optimized timing
  useEffect(() => {
    cleanup();

    const currentWord = words[index];
    
    if (subIndex === currentWord.length + 1 && !reverse) {
      setBlink(false);
      timeoutRef.current = setTimeout(() => {
        setReverse(true);
        setBlink(true);
      }, 1500); // Reduced pause time
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setBlink(true);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // More consistent timing
    const baseDelay = reverse ? 50 : 100; // Faster and more consistent
    const randomDelay = Math.random() * 50; // Reduced randomness
    const delay = baseDelay + randomDelay;

    timeoutRef.current = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, delay);

    return cleanup;
  }, [subIndex, index, reverse, cleanup]);

  // Optimized blinking cursor effect
  useEffect(() => {
    if (blinkTimeoutRef.current) {
      clearTimeout(blinkTimeoutRef.current);
    }

    blinkTimeoutRef.current = setTimeout(() => {
      setBlink(prev => !prev);
    }, 530); // Slightly longer for smoother effect

    return () => {
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, [blink]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const currentText = words[index].substring(0, subIndex);

  return (
    <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter mb-6 animate-fade-in-up">
      Core to <span className="text-primary">{currentText}</span>
      <span 
        className={`inline-block transition-opacity duration-100 ${
          blink ? 'opacity-100' : 'opacity-0'
        }`}
      >
        |
      </span>
    </h1>
  );
}