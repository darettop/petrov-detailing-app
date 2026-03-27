'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: 'Vehicles Perfected', value: 1250, suffix: '+' },
  { label: 'Average Rating', value: 5, suffix: '★' },
  { label: 'Years Experience', value: 8, suffix: '' },
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl text-gold mb-2 font-serif">
        {count}{suffix}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 lg:px-24 container mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="absolute top-0 left-0 w-full h-full border border-gold/20 scale-105 -z-10 transition-transform duration-700 group-hover:scale-110" />
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80" 
            alt="Detailing Close-up"
            className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Right Side: Text Content */}
        <div className="reveal-up">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl mb-10 leading-tight"
          >
            The Art of the <br />
            <span className="italic text-gold">Eternal Shine.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-platinum/60 mb-12 leading-relaxed"
          >
            At PETROV, we don't just wash cars; we rejuvenate them. Our studio is dedicated to the few who understand that a vehicle is more than transportation—it's a masterpiece of engineering that deserves a legacy of perfection. Combining artisanal techniques with the most advanced ceramic technologies, we define the new standard of automotive luxury.
          </motion.p>

          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <StatCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-[10px] uppercase tracking-widest text-platinum/40 text-center mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="mt-16 font-serif italic text-3xl text-gold/30"
          >
            Petrov
          </motion.div>
        </div>
      </div>
    </section>
  );
}
