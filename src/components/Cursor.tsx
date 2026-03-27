'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 1000, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 1000, damping: 50 });

  const outlineX = useSpring(0, { stiffness: 450, damping: 35 });
  const outlineY = useSpring(0, { stiffness: 450, damping: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      outlineX.set(e.clientX);
      outlineY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, .interactive');
      
      if (isInteractive && cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutlineRef.current.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
      } else if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutlineRef.current.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, outlineX, outlineY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40"
        style={{ x: outlineX, y: outlineY }}
      />
    </div>
  );
}
