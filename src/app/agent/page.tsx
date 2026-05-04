import React from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, 
  Wallet, TrendingUp, CheckCircle2, Clock 
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const hawkers = [
    { id: 'H001', name: 'Ramesh Yadav', status: 'PRESENT', paper: 'TOI', qty: 150, time: '05:30 AM' },
    { id: 'H002', name: 'Amit Singh', status: 'PRESENT', paper: 'Dainik Jagran', qty: 200, time: '06:00 AM' },
    { id: 'H003', name: 'Vikram Pal', status: 'ABSENT', paper: '-', qty: 0, time: '-' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <p className="text-[var(--primary)] text-[10px] font-bold tracking-[0.2em] uppercase">AGENT_DEPOT_CONTROL</p>
            <h1 className="text-2xl font-bold tracking-tight">DEPOT_OVERVIEW</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--divider)] px-4 py-2.5 rounded-lg font-bold text-xs hover:bg-[var(--surface-2)] transition-all">
              <Plus size={16} />
              ADD_NEW_HAWKER
            </button>
            <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95">
              <Newspaper size={16} />
              ASSIGN_DAILY_PAPERS
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="MY_WALLET" value="₹18,450" icon={Wallet} />
          <StatCard title="TOTAL_HAWKERS" value="12" icon={Bike} />
          <StatCard title="TODAY_DISPATCH" value="1,240" icon={Newspaper} />
          <StatCard title="COLLECTION_DUE" value="₹42,000" icon={TrendingUp} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Dispatch & Attendance Table */}
          <div className="lg:col-span-2 card p-0 overflow-hidden">
            <div className="p-5 border-b border-[var(--divider)] flex justify-between items-center bg-[var(--surface-2)]">
              <h2 className="text-xs font-bold tracking-widest uppercase">DAILY_HAWKER_DISPATCH_LOG</h2>
              <span className="text-[10px] font-bold text-[var(--muted)]">DATE: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--divider)] text-[10px] uppercase font-bold tracking-widest text-[var(--muted)]">
                    <th className="px-6 py-4">HAWKER</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">PAPER_ASSIGNED</th>
                    <th className="px-6 py-4">QTY</th>
                    <th className="px-6 py-4">DISPATCH_TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--divider)]">
                  {hawkers.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-800">{h.name}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "status-badge",
                          h.status === 'PRESENT' 
                            ? "bg-green-50 text-green-600 border-green-200" 
                            : "bg-red-50 text-red-500 border-red-200"
                        )}>
                          {h.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">{h.paper}</td>
                      <td className="px-6 py-4 font-bold text-[var(--primary)]">{h.qty > 0 ? h.qty : '-'}</td>
                      <td className="px-6 py-4 text-[var(--muted)] font-medium text-xs">
                        <div className="flex items-center gap-1">
                          <Clock size={12} /> {h.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Inventory Summary */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">PAPER_INVENTORY_SUMMARY</h2>
              <div className="space-y-4">
                {[
                  { name: 'The Times of India', code: 'TOI', stock: 450 },
                  { name: 'Dainik Jagran', code: 'DJ', stock: 600 },
                  { name: 'Hindustan Times', code: 'HT', stock: 320 }
                ].map((item) => (
                  <div key={item.code} className="flex items-center justify-between p-3 bg-[var(--surface-2)] rounded-lg">
                    <div>
                      <p className="text-xs font-bold text-slate-700">{item.name}</p>
                      <p className="text-[10px] text-[var(--muted)] font-mono">{item.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-indigo-600">{item.stock}</p>
                      <p className="text-[9px] text-[var(--muted)] font-bold uppercase">UNITS_REMAINING</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase mb-1">QUICK_COLLECTION</p>
                <h3 className="text-xl font-bold mb-4">LOG_CASH_COLLECTION</h3>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-[10px] tracking-widest uppercase">
                  OPEN_LEDGER
                </button>
              </div>
              <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
