import React from 'react';
import { Users, DollarSign, Wallet, FileText, AlertCircle, ArrowUpRight, Store } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import Sidebar from '@/components/layout/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[var(--primary)] text-xs font-bold tracking-[0.2em]">PROTOCOL: ADMIN_CENTRAL</p>
            <h1 className="text-3xl font-bold tracking-tighter">NETWORK_OVERVIEW</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[var(--surface)] border border-[var(--divider)] px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400">CORE_ENGINE: ONLINE</span>
            </div>
            <button className="bg-[var(--primary)] text-black px-4 py-2 text-xs font-bold tracking-widest hover:opacity-90 transition-all">
              GENERATE_MONTHLY_BILLS
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="TOTAL_REVENUE" 
            value="₹4,52,390" 
            change="12.5%" 
            isPositive={true} 
            icon={DollarSign} 
          />
          <StatCard 
            title="PENDING_VERIFICATION" 
            value="42" 
            change="5" 
            isPositive={false} 
            icon={AlertCircle} 
          />
          <StatCard 
            title="ACTIVE_AGENTS" 
            value="128" 
            change="2.4%" 
            isPositive={true} 
            icon={Store} 
          />
          <StatCard 
            title="TOTAL_CUSTOMERS" 
            value="12,450" 
            change="156" 
            isPositive={true} 
            icon={Users} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity / Pending Payments */}
          <div className="lg:col-span-2 bg-[var(--surface)] border border-[var(--divider)] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[var(--divider)] flex justify-between items-center bg-[var(--surface-2)]">
              <h2 className="text-sm font-bold tracking-widest">RECENT_PAYMENT_REQUESTS</h2>
              <button className="text-[var(--primary)] text-[10px] font-bold hover:underline">VIEW_ALL</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--divider)] text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">CUSTOMER</th>
                    <th className="px-6 py-4">AGENT</th>
                    <th className="px-6 py-4">AMOUNT</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--divider)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-[var(--surface-2)] transition-colors group">
                      <td className="px-6 py-4 font-mono text-gray-400">#PAY-{1000 + i}</td>
                      <td className="px-6 py-4 font-bold">Rahul Sharma</td>
                      <td className="px-6 py-4 text-gray-400">Metro Agency</td>
                      <td className="px-6 py-4 text-[var(--primary)] font-bold">₹{450 * i}.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[9px] font-bold tracking-tighter uppercase">
                          PENDING
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-[var(--primary)] transition-colors">
                          <ArrowUpRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats / Wallet Info */}
          <div className="space-y-6">
            <div className="bg-[var(--surface)] border border-[var(--divider)] p-6 rounded-lg">
              <h2 className="text-sm font-bold tracking-widest mb-4">SYSTEM_HEALTH</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-gray-400">AGENT_WALLET_TOTAL</span>
                    <span>₹12,45,000</span>
                  </div>
                  <div className="w-full bg-[var(--divider)] h-1">
                    <div className="bg-[var(--primary)] h-1 w-[75%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-gray-400">HAWKER_ATTENDANCE</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-[var(--divider)] h-1">
                    <div className="bg-[var(--primary)] h-1 w-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--primary-glow)] border border-[var(--primary)] p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-black rounded-md">
                  <Wallet className="text-[var(--primary)]" size={20} />
                </div>
                <h2 className="text-sm font-bold tracking-widest text-[var(--primary)]">AGENT_SETTLEMENT</h2>
              </div>
              <p className="text-xs text-gray-400 mb-4 font-mono">Total pending withdrawal requests from agents requiring immediate attention.</p>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold">12</span>
                <button className="bg-[var(--primary)] text-black px-3 py-1 text-[9px] font-black tracking-widest uppercase">
                  REVIEW_REQUESTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
