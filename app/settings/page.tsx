import { getSession } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Settings as SettingsIcon, Bell, Lock, Eye, Monitor, Globe } from 'lucide-react';

export default async function SettingsPage() {
  const session = await getSession();

  const sections = [
    {
      title: 'Environment',
      icon: Monitor,
      items: [
        { label: 'Dark Mode', value: 'Active', desc: 'Optimized for high-contrast visibility.' },
        { label: 'Refresh Rate', value: '60hz', desc: 'Sync with native hardware frequency.' }
      ]
    },
    {
      title: 'Security',
      icon: Lock,
      items: [
        { label: 'Two-Factor', value: 'Disabled', desc: 'Additional layer for identity protection.' },
        { label: 'Auto-Lock', value: '15 mins', desc: 'Automatic session termination.' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Audit Alerts', value: 'Enabled', desc: 'Real-time security breach notification.' },
        { label: 'Email Digest', value: 'Weekly', desc: 'Periodic account usage reports.' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 relative overflow-hidden text-sm">
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]" />
      
      <Navbar user={session} />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter text-white mb-2 italic">Node<span className="text-purple-500">.</span>Config</h1>
            <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-bold">Workspace Optimization Layer</p>
          </div>
          <SettingsIcon className="w-12 h-12 text-white/5" />
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
              <div className="flex items-center gap-3 mb-8">
                <section.icon className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                    <div>
                      <div className="font-bold text-white text-base mb-1">{item.label}</div>
                      <div className="text-xs text-slate-500 font-medium tracking-tight lh-relaxed max-w-sm">{item.desc}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-400 transition-colors">
                        {item.value}
                       </span>
                       <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Change</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
