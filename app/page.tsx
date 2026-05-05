import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getSession } from '@/lib/auth';
import { ArrowRight, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      <Navbar user={session} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        {/* Ambient Background Glows */}
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        
        <div className="relative z-10 space-y-12">
          <div className="flex justify-center">
            <div className="px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl">
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-slate-500 italic">
                Nexus<span className="text-blue-500">.</span>Architecture Group
              </span>
            </div>
          </div>

          <h1 className="text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] font-bold tracking-tighter text-white italic">
            AUTH<span className="text-blue-500">.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">BEYOND</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium tracking-tight leading-relaxed">
            Stateless authentication for the next generation of edge computing. 
            Encrypted, distributed, and effortlessly elegant.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            {session ? (
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 group"
              >
                <span>Console Gateway</span>
                <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <span>Initialize Node</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-10 py-5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/[0.05] transition-all text-slate-400 hover:text-white"
                >
                  <span>Access Realm</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* System Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 py-8 backdrop-blur-md bg-black/20">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-16 gap-y-6 px-12">
            <div className="flex flex-col items-center gap-1 group">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-600 group-hover:text-blue-500 transition-colors">Middleware</span>
              <div className="h-0.5 w-6 bg-blue-500 group-hover:w-12 transition-all" />
            </div>
            <div className="flex flex-col items-center gap-1 group">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-600 group-hover:text-purple-500 transition-colors">Edge Identity</span>
              <div className="h-0.5 w-6 bg-purple-500 group-hover:w-12 transition-all" />
            </div>
            <div className="flex flex-col items-center gap-1 group">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-600 group-hover:text-emerald-500 transition-colors">JWT v3.0</span>
              <div className="h-0.5 w-6 bg-emerald-500 group-hover:w-12 transition-all" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
