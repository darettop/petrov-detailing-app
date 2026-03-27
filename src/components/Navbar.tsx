'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Gallery', href: '#gallery' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 lg:px-12 flex justify-between items-center",
      isScrolled ? "bg-bg-black/80 backdrop-blur-xl py-4 border-b border-white/10" : "bg-transparent"
    )}>
      <Link href="/" className="text-3xl font-serif tracking-widest text-gold hover:text-gold-hover transition-colors">
        PETROV
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-xs uppercase tracking-widest text-platinum hover:text-gold transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="#book" 
          className="bg-gold hover:bg-gold-hover text-bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
        >
          Book Now
        </Link>
      </div>

      {/* Mobile Menu Trigger */}
      <button 
        className="md:hidden text-gold p-2"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12"
          >
            <button 
              className="absolute top-8 right-8 text-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-platinum hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="#book" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-gold text-bg-black px-10 py-4 text-sm font-bold uppercase tracking-widest"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
