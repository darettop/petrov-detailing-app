'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: "Consultation",
    desc: "A thorough inspection and paint depth analysis to tailor the perfect treatment for your vehicle's unique needs.",
  },
  {
    title: "Decontamination",
    desc: "Multi-stage safe wash including iron fallout removal and mechanical claying to ensure a clinically pure surface.",
  },
  {
    title: "Restoration",
    desc: "Jeweling the paint to a mirror finish through precision machine polishing and texture refinement.",
  },
  {
    title: "Preservation",
    desc: "Application of world-class protection layers, ensuring your vehicle retains its brilliance for years to come.",
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal-up">
          <p className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4">Meticulous Methodology</p>
          <h2 className="text-4xl md:text-6xl italic">The Petrov <span className="font-serif not-italic">Standard.</span></h2>
        </div>

        <div className="max-w-4xl mx-auto relative px-10">
          {/* Vertical Line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-[1px] bg-white/5" />
          
          <div className="flex flex-col gap-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative flex items-start gap-12 group"
              >
                {/* Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-950 border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-bg-black transition-all duration-500">
                   <span className="font-serif text-xl italic">{i + 1}</span>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-2xl mb-4 text-gold/80 group-hover:text-gold transition-colors">{step.title}</h3>
                  <p className="text-platinum/50 text-lg leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
