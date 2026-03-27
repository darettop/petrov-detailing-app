'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  imageUrl: string;
  order: number;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Gallery Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return (
    <div className="py-20 text-center text-gold/20 italic animate-pulse">
      Curating the Collection...
    </div>
  );

  return (
    <section id="gallery" className="py-32 bg-zinc-950/40 px-6 lg:px-24">
      <div className="container mx-auto">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-6xl mb-6">Visual <span className="italic text-gold">Legacies.</span></h2>
          <p className="text-platinum/50 max-w-2xl mx-auto">A testament to our unwavering dedication to the automotive craft. Hover to reveal technical brilliance.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group cursor-pointer overflow-hidden aspect-auto"
              onClick={() => setSelectedImage(item.imageUrl)}
            >
              <Image
                src={item.imageUrl}
                alt={`Detailing Project ${i}`}
                width={800}
                height={600}
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 block rounded-none scale-100 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="bg-bg-black/80 p-4 rounded-full text-gold scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={24} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-20"
          >
            <button 
              className="absolute top-8 right-8 text-gold hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
