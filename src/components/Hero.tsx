'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;
    
    // GSAP Split Text-like reveal (using regular spans)
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 100, rotateX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        duration: 1.2, 
        stagger: 0.05, 
        ease: "power4.out",
        delay: 0.5 
      }
    );
  }, []);

  const titleText = "Where Perfection Meets Passion.";
  const titleWords = titleText.split(" ");

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 scale-110"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-black/40 via-bg-black/60 to-bg-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Car detailing"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <h1 
          ref={titleRef}
          className="text-5xl md:text-8xl lg:text-9xl mb-8 leading-tight perspective-1000"
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block mr-4 py-2 overflow-hidden">
              {word.split("").map((char, j) => (
                <span key={j} className="char inline-block">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="text-lg md:text-2xl text-platinum/70 font-light mb-12 max-w-2xl mx-auto"
        >
          Ultra-Luxury Car Detailing & Deep Cleaning — <br className="hidden md:block" />
          Crafted by Hand, Finished to Perfection.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="#book"
            className="group relative px-10 py-5 bg-gold text-bg-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book a Session</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link 
            href="#gallery"
            className="px-10 py-5 border border-gold/50 text-gold font-bold uppercase tracking-widest hover:bg-gold hover:text-bg-black transition-all"
          >
            View My Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gold/50 cursor-pointer hidden sm:block"
      >
        <Link href="#about">
          <ChevronDown size={40} strokeWidth={1} />
        </Link>
      </motion.div>
    </section>
  );
}
