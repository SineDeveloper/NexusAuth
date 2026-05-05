'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { LogOut, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface NavbarProps {
  user?: { email: string; name: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Logged out');
        router.refresh();
        router.push('/login');
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-20 backdrop-blur-md bg-black/20 border-b border-white/5">
      <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
        <div className="w-8 h-8 bg-gradient-to-br from-white to-slate-400 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-black rotate-45"></div>
        </div>
        <span className="font-bold text-white tracking-tight text-xl italic">Nexus<span className="text-blue-400">Auth</span></span>
      </Link>

      <div className="flex items-center gap-8">
        {user ? (
          <>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium text-slate-300">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-slate-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-sm font-bold text-black bg-white rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Initialize
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
