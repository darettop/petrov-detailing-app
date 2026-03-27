'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Car, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { id: 'detail', name: 'Signature Detail', price: '$500+' },
  { id: 'ceramic', name: 'Ceramic Coating', price: '$1200+' },
  { id: 'interior', name: 'Deep Interior', price: '$350+' },
  { id: 'engine', name: 'Engine Bay', price: '$200+' },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"
];

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    carMake: ''
  });

  // DB State
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch('/api/availability');
        const data = await res.json();
        setBlockedDates(data);
      } catch (err) {
        console.error('Availability Fetch Error:', err);
      }
    };
    fetchAvailability();
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) setStep(5);
    } catch (err) {
      alert('Error submitting booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple Local Calendar Logic
  const renderCalendar = () => {
    const today = new Date();
    const days = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const isBlocked = blockedDates.includes(dateStr);
      const isSelected = bookingData.date === dateStr;
      
      days.push(
        <button
          key={dateStr}
          disabled={isBlocked}
          onClick={() => setBookingData({ ...bookingData, date: dateStr })}
          className={cn(
            "p-4 border border-white/5 transition-all text-sm",
            isBlocked ? "opacity-20 cursor-not-allowed bg-red-900/10" : "hover:border-gold hover:bg-gold/5",
            isSelected ? "border-gold bg-gold text-bg-black" : "text-platinum/60"
          )}
        >
          <div className="text-[10px] uppercase opacity-50 mb-1">
            {d.toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div className="text-lg font-serif">{d.getDate()}</div>
        </button>
      );
    }
    return <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-8">{days}</div>;
  };

  return (
    <section id="book" className="py-32 px-6 lg:px-24">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl mb-4 italic">Reserve Your <span className="not-italic font-serif">Legacy.</span></h2>
          <div className="flex items-center justify-center gap-4 text-gold/40 text-xs uppercase tracking-widest">
             <span className={cn(step >= 1 ? "text-gold" : "")}>Service</span>
             <span>•</span>
             <span className={cn(step >= 2 ? "text-gold" : "")}>Date</span>
             <span>•</span>
             <span className={cn(step >= 3 ? "text-gold" : "")}>Time</span>
             <span>•</span>
             <span className={cn(step >= 4 ? "text-gold" : "")}>Details</span>
          </div>
        </div>

        <div className="glass p-8 md:p-16 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
           <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-serif text-center mb-12">Select Your Treatment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(s => (
                      <button 
                        key={s.id}
                        onClick={() => { setBookingData({...bookingData, service: s.name}); nextStep(); }}
                        className={cn(
                          "flex items-center justify-between p-6 border transition-all text-left group",
                          bookingData.service === s.name ? "border-gold bg-gold/10" : "border-white/5 hover:border-gold/30 bg-white/[0.02]"
                        )}
                      >
                        <div>
                          <div className="text-lg mb-1">{s.name}</div>
                          <div className="text-xs text-platinum/40">{s.price}</div>
                        </div>
                        <ChevronRight className="text-gold/20 group-hover:text-gold transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                   key="step2"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-8">
                     <button onClick={prevStep} className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors uppercase text-[10px] tracking-widest"><ChevronLeft size={16}/> Back</button>
                     <h3 className="text-2xl font-serif">Select Date</h3>
                     <div className="w-20" />
                  </div>
                  {renderCalendar()}
                  {bookingData.date && (
                    <div className="mt-12 text-center">
                      <button onClick={nextStep} className="bg-gold text-bg-black px-12 py-4 font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">Next: Select Time</button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                   key="step3"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-12">
                     <button onClick={prevStep} className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors uppercase text-[10px] tracking-widest"><ChevronLeft size={16}/> Back</button>
                     <h3 className="text-2xl font-serif">Select Time</h3>
                     <div className="w-20" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    {timeSlots.map(t => (
                      <button 
                        key={t}
                        onClick={() => { setBookingData({...bookingData, time: t}); nextStep(); }}
                        className={cn(
                          "p-6 border transition-all font-serif",
                          bookingData.time === t ? "border-gold bg-gold text-bg-black" : "border-white/5 hover:border-gold/30 bg-white/[0.02]"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                   key="step4"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex justify-between items-center mb-12">
                     <button onClick={prevStep} className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors uppercase text-[10px] tracking-widest"><ChevronLeft size={16}/> Back</button>
                     <h3 className="text-2xl font-serif">Personal Details</h3>
                     <div className="w-20" />
                  </div>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <input 
                      required 
                      type="text" 
                      placeholder="Full Name" 
                      className="bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    />
                    <input 
                      required 
                      type="email" 
                      placeholder="Email Address" 
                      className="bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    />
                    <input 
                      required 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    />
                    <input 
                      required 
                      type="text" 
                      placeholder="Vehicle Make & Model" 
                      className="bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
                      value={bookingData.carMake}
                      onChange={(e) => setBookingData({...bookingData, carMake: e.target.value})}
                    />
                    <button 
                      disabled={isSubmitting}
                      className="md:col-span-2 bg-gold text-bg-black py-5 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-10 text-bg-black">
                     <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-serif">Reservation Received.</h3>
                  <p className="text-platinum/50 max-w-md mx-auto">Thank you, {bookingData.name.split(' ')[0]}. Our concierge will review your session for {bookingData.date} and reach out shortly to finalize the briefing.</p>
                  <button onClick={() => setStep(1)} className="text-gold uppercase tracking-widest text-xs border-b border-gold/30 hover:border-gold pb-2 transition-all">Make Another Booking</button>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
