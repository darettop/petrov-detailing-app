'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Droplets, Zap } from 'lucide-react';

const services = [
  {
    title: "Signature Detail",
    desc: "A meticulous multi-stage restoration involving deep decontamination and artisanal polishing.",
    price: "From $500",
    icon: Sparkles,
  },
  {
    title: "Ceramic Coating",
    desc: "Long-term protection with ultra-hydrophobic properties and a diamond-like gloss finish.",
    price: "From $1200",
    icon: Shield,
  },
  {
    title: "Deep Interior",
    desc: "Advanced steam extraction and leather rejuvenation using premium organic treatments.",
    price: "From $350",
    icon: Droplets,
  },
  {
    title: "Engine Bay",
    desc: "Thorough safe-cleaning and component conditioning for a showroom-ready engine.",
    price: "From $200",
    icon: Zap,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-zinc-950/40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="reveal-up max-w-xl">
            <h2 className="text-4xl md:text-6xl mb-6">Exquisite <span className="italic text-gold">Treatments</span></h2>
            <p className="text-platinum/50 text-lg">Curated solutions for those who demand uncompromising preservation and aesthetic brilliance.</p>
          </div>
          <div className="text-gold/20 text-8xl font-serif italic hidden lg:block">02</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] p-10 border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-gold/20 transition-all duration-700" />
              
              <div className="mb-10 text-gold group-hover:scale-110 transition-transform duration-500">
                <service.icon size={40} strokeWidth={1} />
              </div>
              
              <h3 className="text-2xl mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-platinum/40 text-sm mb-8 leading-relaxed">{service.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs uppercase tracking-widest text-gold/60">{service.price}</span>
                <span className="h-[1px] w-12 bg-gold/20 group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
