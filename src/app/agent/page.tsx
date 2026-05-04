"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, 
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const hawkers = [
    { id: 'H001', name: 'Ramesh Yadav', area: 'Sector 4', status: 'PRESENT', paper: 'TOI', qty: 150, cash_collected: 1200, online_collected: 3400 },
    { id: 'H002', name: 'Amit Singh', area: 'Rohini Block A', status: 'PRESENT', paper: 'DJ', qty: 200, cash_collected: 800, online_collected: 1500 },
    { id: 'H003', name: 'Vikram Pal', area: 'Market Road', status: 'ABSENT', paper: '-', qty: 0, cash_collected: 0, online_collected: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">DEPOT_COMMAND: ACTIVE</p>
            <h1 className="text-2xl font-bold tracking-tight">DISTRIBUTION_MANAGEMENT</h1>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm"
            >
              <Plus size={16} /> REASSIGN_HAWKER
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-90">
              <Download size={16} /> EXPORT_COLLECTION_REPORT
            </button>
          </div>
        </header>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="TOTAL_CASH_IN_HAND" value="₹12,450" icon={Wallet} />
          <StatCard title="ONLINE_COLLECTION" value="₹24,560" icon={TrendingUp} />
          <StatCard title="HAWKERS_ON_FIELD" value="8/12" icon={Bike} />
          <StatCard title="PENDING_PAPERS" value="340" icon={Newspaper} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Hawker & Collection Table */}
          <div className="lg:col-span-2 card p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xs font-bold tracking-widest uppercase">LIVE_HAWKER_TRACKING_&_CASH</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search hawker..." className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-slate-100">
                    <th className="px-6 py-4">HAWKER / AREA</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">CASH_COLLECTED</th>
                    <th className="px-6 py-4">ONLINE</th>
                    <th className="px-6 py-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {hawkers.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{h.name}</p>
                        <p className="text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                          <MapPin size={10} /> {h.area}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "status-badge",
                          h.status === 'PRESENT' ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-500 border-red-100"
                        )}>
                          {h.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">₹{h.cash_collected}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">₹{h.online_collected}</td>
                      <td className="px-6 py-4 text-right">
                        {h.status === 'ABSENT' ? (
                          <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                            MANUAL_ATTENDANCE
                          </button>
                        ) : (
                          <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600">VIEW_DETAILS</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paper Assignment Summary */}
          <div className="card">
            <h2 className="text-xs font-bold tracking-widest mb-6 uppercase">AREA_WISE_PAPER_LOAD</h2>
            <div className="space-y-4">
              {[
                { area: 'Sector 4', paper: 'TOI', qty: 450, hawker: 'Ramesh Y.' },
                { area: 'Rohini Block A', paper: 'DJ', qty: 320, hawker: 'Amit S.' },
                { area: 'Market Square', paper: 'HT', qty: 280, hawker: 'Vikram P.' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-slate-800 uppercase">{item.area}</p>
                    <span className="text-[10px] font-mono font-bold text-indigo-600">{item.paper}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-slate-400 font-medium italic">Current: {item.hawker}</p>
                    <p className="text-sm font-black text-slate-700">{item.qty} Pcs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Placeholder for Add/Change Hawker */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl animate-fade-in">
              <h2 className="text-xl font-bold mb-2">REASSIGN_HAWKER_TO_AREA</h2>
              <p className="text-xs text-slate-400 font-bold uppercase mb-6">Update area distribution logistics</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">SELECT_AREA</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-indigo-600">
                    <option>Sector 4 (Fixed)</option>
                    <option>Rohini Block A (Fixed)</option>
                    <option>Market Square (Fixed)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">ASSIGN_NEW_HAWKER</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-indigo-600">
                    {hawkers.map(h => <option key={h.id}>{h.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-[10px] uppercase text-slate-400">CANCEL</button>
                <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-[10px] uppercase shadow-lg shadow-indigo-100">CONFIRM_ASSIGNMENT</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
