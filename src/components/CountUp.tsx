'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

interface CountUpProps {
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function CountUp({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  suffix = '',
  className = '',
  style,
  onComplete,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || !ref.current) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.33, 1, 0.68, 1], // easeOut cubic
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(value)}${suffix}`;
        }
      },
      onComplete() {
        onComplete?.();
      },
    });

    return () => controls.stop();
  }, [started, from, to, duration, suffix, onComplete]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums', ...style }}
    >
      {from}{suffix}
    </span>
  );
}
