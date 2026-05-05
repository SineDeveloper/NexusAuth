'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(`Welcome to the Nexus, ${result.user.name}`);
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative bg-[#050505] overflow-hidden px-4">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" />
      
      <Navbar />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full flex justify-center"
      >
        <AuthForm type="register" onSubmit={handleRegister} loading={loading} />
      </motion.div>

      {/* Footer Vitals */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 border-t border-white/5 px-12 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600 z-20 backdrop-blur-sm">
        <div>Registry &bull; New Identity Propagation</div>
        <div className="flex gap-6">
          <span>Terms of Edge</span>
          <span>Nexus Protocol</span>
        </div>
      </footer>
    </main>
  );
}
