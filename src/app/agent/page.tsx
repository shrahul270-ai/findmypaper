"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, MessageSquare, Check, X, Edit3, Image as ImageIcon
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('HAWKERS'); // HAWKERS, REQUESTS, MARKET
  const [showAddSpecial, setShowAddSpecial] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  
  const requests = [
    { id: 'REQ-01', customer: 'Rahul Sharma', flat: '402, Green Valley', msg: 'Going to village for 10 days. Stop paper from 10th May.', dates: '10 May - 20 May', status: 'PENDING' },
  ];

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Item added to Customer Ledger with Photo Proof! Bill updated.");
    setShowAddSpecial(false);
    setPhotoCaptured(false);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">DEPOT_COMMAND: ACTIVE</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">AGENT_MANAGEMENT_TERMINAL</h1>
          </div>
          <button 
            onClick={() => setShowAddSpecial(true)}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black text-xs shadow-xl shadow-indigo-100 flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Plus size={18} /> ADD_SPECIAL_BOOKLET
          </button>
        </header>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('HAWKERS')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all", activeTab === 'HAWKERS' ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            HAWKER_TRACKING
          </button>
          <button onClick={() => setActiveTab('REQUESTS')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all relative", activeTab === 'REQUESTS' ? "bg-amber-500 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            SERVICE_REQUESTS
          </button>
          <button onClick={() => setActiveTab('MARKET')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all", activeTab === 'MARKET' ? "bg-indigo-600 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            CATALOG_MGMT
          </button>
        </div>

        {activeTab === 'HAWKERS' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 card p-0 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400">TEAM_PERFORMANCE_&_CASH</h2>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400">
                    <th className="px-6 py-4">HAWKER</th>
                    <th className="px-6 py-4">AREA</th>
                    <th className="px-6 py-4">CASH_COLL.</th>
                    <th className="px-6 py-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-700">Ramesh Yadav</td>
                    <td className="px-6 py-4 font-bold text-indigo-600 text-xs">Sector 4</td>
                    <td className="px-6 py-4 font-black">₹1,200</td>
                    <td className="px-6 py-4 text-right">
                      <span className="status-badge bg-green-50 text-green-600 border-green-100 uppercase">PRESENT</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Catalog Management View */}
        {activeTab === 'MARKET' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {[
              { name: 'Pratiyogita Darpan', price: 95, sold: 12 },
              { name: 'Champak', price: 45, sold: 45 },
              { name: 'India Today', price: 60, sold: 28 },
            ].map((item, i) => (
              <div key={i} className="card">
                <div className="flex justify-between items-center mb-4">
                  <BookOpen className="text-indigo-600" size={24} />
                  <span className="text-[10px] font-bold bg-slate-50 px-2 py-1 rounded">STOCK_AVAILABLE</span>
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tighter">{item.name}</h3>
                <div className="flex justify-between items-end mt-4">
                  <p className="text-xl font-black text-slate-900">₹{item.price}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sold: {item.sold}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Item Addition Modal */}
        {showAddSpecial && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-[2.5rem] p-8 shadow-2xl animate-fade-in relative">
              <button onClick={() => setShowAddSpecial(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600"><X size={24} /></button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">ADD_SPECIAL_ITEM</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Direct assignment to customer ledger</p>
              </div>

              <form onSubmit={handleManualAdd} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">SELECT_CUSTOMER</label>
                    <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none">
                      <option>Rahul Sharma (Flat 402)</option>
                      <option>Sonia Gupta (B-12)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">SELECT_BOOKLET/PAPER</label>
                    <select required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none">
                      <option>Pratiyogita Darpan (₹95)</option>
                      <option>Champak (₹45)</option>
                      <option>India Today (₹60)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1 text-center">DELIVERY_PROOF (PHOTO_REQUIRED)</label>
                  <div 
                    onClick={() => setPhotoCaptured(true)}
                    className={cn(
                      "border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all",
                      photoCaptured ? "bg-emerald-50 border-emerald-400" : "bg-slate-50 border-slate-200 hover:border-indigo-400"
                    )}
                  >
                    {photoCaptured ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-emerald-500 mb-2" size={40} />
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Photo_Captured_Successfully</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="text-slate-300 mb-2" size={40} />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tap to Take Photo</p>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-indigo-600 transition-all"
                >
                  ADD_TO_BILL_&_NOTIFY
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
