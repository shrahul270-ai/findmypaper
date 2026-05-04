"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, 
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, MessageSquare, Check, X, Edit3
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('HAWKERS'); // HAWKERS, REQUESTS
  
  const requests = [
    { id: 'REQ-01', customer: 'Rahul Sharma', flat: '402, Green Valley', msg: 'Going to village for 10 days. Stop paper from 10th May.', dates: '10 May - 20 May', status: 'PENDING' },
    { id: 'REQ-02', customer: 'Sonia Gupta', flat: 'B-12, Sector 4', msg: 'Stop Dainik Jagran permanently. Starting TOI from tomorrow.', dates: 'Permanent', status: 'PENDING' }
  ];

  const hawkers = [
    { id: 'H001', name: 'Ramesh Yadav', area: 'Sector 4', status: 'PRESENT', cash_collected: 1200, online_collected: 3400 },
    { id: 'H002', name: 'Amit Singh', area: 'Rohini Block A', status: 'PRESENT', cash_collected: 800, online_collected: 1500 },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">DEPOT_COMMAND: ACTIVE</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">AGENT_MANAGEMENT_TERMINAL</h1>
          </div>
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg">DAILY_ASSIGNMENT</button>
            <button className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm text-slate-400">
              <Download size={18} />
            </button>
          </div>
        </header>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('HAWKERS')}
            className={cn(
              "px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all",
              activeTab === 'HAWKERS' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            HAWKER_TRACKING
          </button>
          <button 
            onClick={() => setActiveTab('REQUESTS')}
            className={cn(
              "px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all relative",
              activeTab === 'REQUESTS' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "bg-white text-slate-400 border border-slate-100"
            )}
          >
            CUSTOMER_REQUESTS
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white">
              {requests.length}
            </span>
          </button>
        </div>

        {activeTab === 'HAWKERS' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 card p-0 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400">LIVE_TEAM_&_BILLING</h2>
                <button className="text-[10px] font-bold text-indigo-600">VIEW_ALL_CUSTOMERS</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400">
                    <th className="px-6 py-4">HAWKER</th>
                    <th className="px-6 py-4">AREA</th>
                    <th className="px-6 py-4">CASH_COLL.</th>
                    <th className="px-6 py-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {hawkers.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-700">{h.name}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600 text-xs">{h.area}</td>
                      <td className="px-6 py-4 font-black">₹{h.cash_collected}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="flex items-center gap-1.5 ml-auto bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                          <Edit3 size={12} /> EDIT_BILL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card h-fit">
              <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6">BILLING_SUMMARY</h2>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">EXPECTED_TODAY</p>
                  <p className="text-2xl font-black text-indigo-600">₹42,000</p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">ACTUAL_COLLECTED</p>
                  <p className="text-2xl font-black text-emerald-600">₹38,450</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {requests.map((req) => (
              <div key={req.id} className="card border-l-4 border-l-amber-400 shadow-xl shadow-slate-100">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase">PENDING_REQUEST</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">• {req.dates}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-800">{req.customer}</h3>
                    <p className="text-xs font-bold text-indigo-600 flex items-center gap-1 mb-4">
                      <MapPin size={12} /> {req.flat}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3">
                      <MessageSquare className="text-slate-300 shrink-0" size={20} />
                      <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{req.msg}"</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 justify-center">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:opacity-90">
                      <Check size={16} /> APPROVE_&_STOP_BILL
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-400 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                      <X size={16} /> REJECT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
