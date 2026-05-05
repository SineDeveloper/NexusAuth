import { getSession } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { motion } from 'motion/react';
import { Shield, Lock, Zap, Clock, UserIcon, Globe } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getSession();

  const stats = [
    { label: 'Security Level', value: 'Level 4', icon: Shield },
    { label: 'Encryption', value: 'AES-256', icon: Lock },
    { label: 'Uptime', value: '99.9%', icon: Zap },
    { label: 'Last Sync', value: '2 mins ago', icon: Clock },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px]" />
      
      <Navbar user={session} />

      <div className="max-w-7xl mx-auto px-12 pt-32 pb-20 relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Node Sync Active</span>
            </div>
            <h1 className="text-6xl font-bold tracking-tighter text-white">
              Nexus<span className="text-blue-500">.</span>Dashboard
            </h1>
            <p className="text-lg text-slate-400 font-medium max-w-xl">
              Account identity: <span className="text-white">{session?.email}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              Security Logs
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-lg hover:border-white/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <stat.icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">{stat.label}</div>
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl h-full shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  Real-time Traffic
                </h3>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Enterprise</span>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((log) => (
                  <div key={log} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all cursor-default group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Lock className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Encrypted Handshake</div>
                        <div className="text-xs text-slate-500">Authorized from 84.21.109.*</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">0.05ms Latency</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-200 text-black shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <Shield className="w-12 h-12 text-black/5" />
              </div>
              <UserIcon className="w-10 h-10 mb-8" />
              <h3 className="text-3xl font-bold tracking-tight mb-4 italic">Node Profile</h3>
              <p className="text-sm text-slate-600 mb-10 leading-relaxed">
                Your authentication status is verified by our distributed middleware network. Access tokens are rotating every 2 hours.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest border-b border-black/5 pb-3">
                  <span className="opacity-40">Identifier</span>
                  <span className="font-mono">{session?.userId.slice(0, 12)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest border-b border-black/5 pb-3">
                  <span className="opacity-40">Status</span>
                  <span className="text-blue-600">PRODUCTION</span>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-all">
                Rotate Keys
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
