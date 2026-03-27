'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Unauthorized access.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 to-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 md:p-16 text-center"
      >
        <h1 className="text-3xl font-serif text-gold mb-12 tracking-widest">PETROV ADMIN</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            required
            type="password" 
            placeholder="Password" 
            className="w-full bg-white/5 border border-white/10 p-4 text-platinum focus:border-gold focus:outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className="text-red-500 text-xs uppercase tracking-widest">{error}</p>}
          
          <button 
            disabled={loading}
            className="w-full bg-gold text-bg-black py-4 font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Authorize"}
          </button>
        </form>
        
        <p className="mt-12 text-[10px] uppercase tracking-widest text-platinum/20">Secure Enterprise Portal</p>
      </motion.div>
    </div>
  );
}
