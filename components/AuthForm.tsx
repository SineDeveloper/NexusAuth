'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

export default function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === 'login';

  return (
    <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-[10px] font-bold text-white rounded-bl-xl uppercase tracking-widest shadow-lg">
        Secure Node
      </div>
      
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-semibold text-white mb-2">
          {isLogin ? 'Welcome back' : 'Create Identity'}
        </h2>
        <p className="text-sm text-slate-500">
          {isLogin ? 'Access your encrypted workspace.' : 'Register new node in the nexus.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Ex. John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 text-white placeholder:text-slate-600 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="admin@nexusauth.io"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 text-white placeholder:text-slate-600 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 text-white placeholder:text-slate-600 transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-ful rounded-2xl mt-4 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="uppercase tracking-wider">{isLogin ? 'Initialize Session' : 'Create Node'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">
          {isLogin ? "No identity yet?" : "Existing node?"}{' '}
          <Link
            href={isLogin ? '/register' : '/login'}
            className="text-white hover:text-blue-400 transition-colors font-medium"
          >
            {isLogin ? 'Register now' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
}
