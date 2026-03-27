'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  CheckCircle, 
  Trash2, 
  XCircle, 
  Plus,
  Loader2,
  DollarSign,
  TrendingUp,
  Target,
  Users,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data State
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = {
    totalRevenue: bookings.filter(b => b.status === 'confirmed').reduce((acc, b) => acc + (b.price || 0), 0),
    pendingLeads: bookings.filter(b => b.status === 'pending').length,
    conversionRate: bookings.length ? Math.round((bookings.filter(b => b.status === 'confirmed').length / bookings.length) * 100) : 0,
    activeServices: services.length
  };

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
    if (status === 'authenticated') fetchData();
  }, [status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, servicesRes, galleryRes, availRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/services'),
        fetch('/api/gallery'),
        fetch('/api/availability')
      ]);
      setBookings(await bookingsRes.json());
      setServices(await servicesRes.json());
      setGallery(await galleryRes.json());
      setBlockedDates(await availRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}/confirm`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? {...b, status} : b));
      }
    } catch (err) {
      console.error('Update Error:', err);
    }
  };

  if (status === 'loading' || loading) return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center">
       <Loader2 className="animate-spin text-gold" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black flex flex-col p-8 fixed h-full z-10">
        <div className="text-xl font-serif text-gold tracking-widest mb-16">PETROV ADMIN</div>
        
        <nav className="space-y-4 flex-1">
          <button 
             onClick={() => setActiveTab('bookings')}
             className={cn("w-full flex items-center gap-4 p-4 text-xs uppercase tracking-widest hover:text-gold transition-colors", activeTab === 'bookings' ? "text-gold border-r-2 border-gold font-bold" : "text-platinum/40")}
          >
            <BarChart3 size={18} /> Bookings
          </button>
          <button 
             onClick={() => setActiveTab('gallery')}
             className={cn("w-full flex items-center gap-4 p-4 text-xs uppercase tracking-widest hover:text-gold transition-colors", activeTab === 'gallery' ? "text-gold border-r-2 border-gold font-bold" : "text-platinum/40")}
          >
            <ImageIcon size={18} /> Gallery
          </button>
          <button 
             onClick={() => setActiveTab('availability')}
             className={cn("w-full flex items-center gap-4 p-4 text-xs uppercase tracking-widest hover:text-gold transition-colors", activeTab === 'availability' ? "text-gold border-r-2 border-gold font-bold" : "text-platinum/40")}
          >
            <Calendar size={18} /> Availability
          </button>
          <button 
             onClick={() => setActiveTab('services')}
             className={cn("w-full flex items-center gap-4 p-4 text-xs uppercase tracking-widest hover:text-gold transition-colors", activeTab === 'services' ? "text-gold border-r-2 border-gold font-bold" : "text-platinum/40")}
          >
            <Briefcase size={18} /> Services
          </button>
        </nav>

        <button 
          onClick={() => signOut()}
          className="mt-auto flex items-center gap-4 p-4 text-xs uppercase tracking-widest text-red-900/60 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
         <header className="flex justify-between items-end mb-16">
            <div>
               <h2 className="text-sm uppercase tracking-widest text-gold mb-2">Director Dashboard</h2>
               <h1 className="text-4xl font-serif">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            </div>
            <div className="text-xs text-platinum/30 uppercase tracking-[0.25em]">Session: {session?.user?.name}</div>
         </header>

         <AnimatePresence mode="wait">
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                   {[
                     { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
                     { label: 'Pending Leads', value: stats.pendingLeads, icon: Target, color: 'text-gold' },
                     { label: 'Conversion', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'text-blue-500' },
                     { label: 'Services', value: stats.activeServices, icon: Briefcase, color: 'text-platinum' }
                   ].map((stat, i) => (
                     <div key={i} className="glass p-6 border border-white/5 flex items-center gap-4">
                        <div className={cn("p-3 bg-white/5 rounded-none", stat.color)}>
                           <stat.icon size={20} />
                        </div>
                        <div>
                           <div className="text-[10px] uppercase tracking-widest text-platinum/20 mb-1">{stat.label}</div>
                           <div className="text-xl font-serif">{stat.value}</div>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="glass overflow-hidden border border-white/5 rounded-none">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/5">
                       <tr className="text-[10px] uppercase tracking-widest text-platinum/40">
                         <th className="p-6">Date</th>
                         <th className="p-6">Client & Vehicle</th>
                         <th className="p-6">Contact Info</th>
                         <th className="p-6">Service</th>
                         <th className="p-6">Time</th>
                         <th className="p-6">Status</th>
                         <th className="p-6 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {bookings.map((booking) => (
                         <tr key={booking.id} className="hover:bg-white/[0.01] transition-colors group">
                            <td className="p-6 text-sm font-serif">{booking.date}</td>
                            <td className="p-6">
                               <div className="text-sm">{booking.name}</div>
                               <div className="text-[10px] text-platinum/30 uppercase tracking-widest mt-1">{booking.carMake}</div>
                            </td>
                            <td className="p-6">
                               <div className="text-xs text-platinum/60 hover:text-gold transition-colors truncate max-w-[150px]">
                                  <a href={`mailto:${booking.email}`}>{booking.email}</a>
                               </div>
                               <div className="text-xs text-gold/60 hover:text-gold transition-colors mt-1">
                                  <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                               </div>
                            </td>
                            <td className="p-6 text-xs uppercase tracking-widest">{booking.service}</td>
                            <td className="p-6 text-xs text-platinum/60">{booking.time}</td>
                            <td className="p-6">
                               <span className={cn(
                                 "text-[10px] px-3 py-1 uppercase tracking-widest rounded-none",
                                 booking.status === 'confirmed' ? "bg-green-900/20 text-green-400" : "bg-gold/10 text-gold"
                               )}>
                                 {booking.status}
                               </span>
                            </td>
                            <td className="p-6 text-right">
                               <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {booking.status !== 'confirmed' && (
                                    <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="p-2 hover:text-green-400 transition-colors"><CheckCircle size={18} /></button>
                                  )}
                                  <button className="p-2 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                   <button className="aspect-square border-2 border-dashed border-white/10 hover:border-gold/30 hover:bg-gold/5 flex flex-col items-center justify-center gap-4 transition-all">
                      <Plus className="text-gold/20" size={32} />
                      <span className="text-[10px] uppercase tracking-widest text-gold/40">Add Visual</span>
                   </button>
                   {gallery.map((item) => (
                     <div key={item.id} className="relative aspect-square group overflow-hidden border border-white/5">
                        <img src={item.imageUrl} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                        <button className="absolute top-2 right-2 p-2 bg-black/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div key="availability" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <div className="glass p-12 max-w-2xl">
                    <h3 className="text-xl font-serif mb-8 text-gold">Blocked Dates</h3>
                    <div className="grid grid-cols-7 gap-4">
                       {/* Simplified calendar for admin settings */}
                       {Array.from({length: 31}).map((_, i) => (
                         <button 
                           key={i}
                           className={cn(
                             "aspect-square flex items-center justify-center border transition-all text-xs font-serif",
                             [5, 12, 18, 25].includes(i) ? "bg-red-900/20 border-red-500/30 text-red-400" : "border-white/5 hover:border-gold/30"
                           )}
                         >
                           {i + 1}
                         </button>
                       ))}
                    </div>
                    <p className="mt-8 text-[10px] uppercase tracking-widest text-platinum/20">Click a date to manually toggle availability across the platform.</p>
                 </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <button className="p-8 border-2 border-dashed border-white/10 hover:border-gold/30 hover:bg-gold/5 flex flex-col items-center justify-center gap-4 transition-all h-64">
                      <Plus className="text-gold/20" size={32} />
                      <span className="text-[10px] uppercase tracking-widest text-gold/40">Add New Offering</span>
                   </button>
                   {services.map((service) => (
                     <div key={service.id} className="glass p-8 border border-white/5 flex flex-col group relative">
                        <div className="flex justify-between items-start mb-6">
                           <h3 className="text-xl font-serif text-gold">{service.name}</h3>
                           <div className="text-lg text-platinum/60 font-serif">${service.price}</div>
                        </div>
                        <p className="text-xs text-platinum/40 leading-relaxed mb-8 flex-1">{service.description}</p>
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-platinum/20">
                           <span>{service.duration}</span>
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="hover:text-gold"><Settings size={14}/></button>
                              <button className="hover:text-red-500"><Trash2 size={14}/></button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </main>
    </div>
  );
}
