"use client";

import { useState, useEffect } from 'react';

const words = ["Stack", "Glory", "Imagine"];

export default function TypedHeading() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setBlink(false);
      setTimeout(() => setReverse(true), 2000); // Pause before deleting
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setBlink(true);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);


  return (
    <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter mb-6 animate-fade-in-up">
      Code to <span className="text-primary">{words[index].substring(0, subIndex)}</span>
      <span className={blink ? 'animate-ping' : ''}>|</span>
    </h1>
  );
}
