import { getSession } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { User, Mail, Calendar, ShieldAlert, Key, Fingerprint } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
      
      <Navbar user={session} />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-2 italic">User<span className="text-blue-500">.</span>Profile</h1>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">Identity Verification Protocol 7-A</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="md:col-span-1">
            <div className="aspect-square rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center p-8 group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform">
                <span className="text-4xl font-bold text-white uppercase">{session?.name?.[0]}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{session?.name}</h3>
              <p className="text-xs text-slate-500 font-mono">NODE_{session?.userId.slice(0, 8)}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldAlert className="w-3 h-3" /> Basic Information
              </h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Legal Name</div>
                    <div className="text-white font-medium">{session?.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Network Email</div>
                    <div className="text-white font-medium">{session?.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Initialization Date</div>
                    <div className="text-white font-medium">May 2026</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Fingerprint className="w-3 h-3" /> Security Credentials
              </h4>
              <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                   <Key className="w-4 h-4 text-slate-400" />
                   <span className="text-xs font-bold uppercase tracking-tighter text-slate-300">Session RSA-4096 Key</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600">ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
