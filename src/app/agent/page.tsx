"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, MessageSquare, Check, X, Edit3, Image as ImageIcon, Phone, Fingerprint
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('HAWKERS'); // HAWKERS, REQUESTS, MARKET, ORDERS
  
  const newOrders = [
    { 
      id: 'ORD-7701', 
      customer: 'Rahul Sharma', 
      address: 'Flat 402, Green Valley Apartments, Rohini Sector 9', 
      phone: '+91 98765 43210', 
      userId: 'UID-RAHUL-09',
      item: 'Economic Times',
      type: 'NEWSPAPER',
      status: 'PENDING_APPROVAL'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">CONTROL_CENTER: ACTIVE</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 uppercase italic">AGENT_COMMAND_TERMINAL</h1>
          </div>
          <div className="flex gap-3">
             <div className="bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl text-amber-700 text-xs font-black animate-pulse uppercase tracking-widest">
               {newOrders.length} NEW_SUBSCRIPTIONS
             </div>
          </div>
        </header>

        {/* Updated Tab Selection */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setActiveTab('HAWKERS')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all", activeTab === 'HAWKERS' ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            HAWKER_TRACKING
          </button>
          <button onClick={() => setActiveTab('ORDERS')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all relative", activeTab === 'ORDERS' ? "bg-indigo-600 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            NEW_SUBSCRIPTIONS
            {newOrders.length > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white">{newOrders.length}</span>}
          </button>
          <button onClick={() => setActiveTab('REQUESTS')} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all", activeTab === 'REQUESTS' ? "bg-amber-500 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>
            SERVICE_REQUESTS
          </button>
        </div>

        {activeTab === 'ORDERS' && (
          <div className="space-y-6 animate-fade-in">
            {newOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">{order.type}</span>
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">ID: {order.id}</span>
                    </div>
                    
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-6 italic">{order.customer} <span className="text-indigo-600">is requesting {order.item}</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">FULL_DELIVERY_ADDRESS</p>
                        <div className="flex gap-3 text-slate-700">
                          <MapPin className="text-indigo-600 shrink-0" size={20} />
                          <p className="text-xs font-bold leading-relaxed uppercase">{order.address}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <Phone className="text-indigo-600" size={18} />
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase">CONTACT_NUMBER</p>
                            <p className="text-xs font-black text-slate-800">{order.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <Fingerprint className="text-indigo-600" size={18} />
                          <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase">USER_SYSTEM_ID</p>
                            <p className="text-xs font-black text-slate-800 uppercase">{order.userId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-3 justify-center min-w-[200px]">
                    <button className="flex-1 lg:flex-none bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-emerald-100 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                      <Check size={18} /> CONFIRM_&_START
                    </button>
                    <button className="flex-1 lg:flex-none bg-white border border-slate-200 text-slate-400 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2">
                      <X size={18} /> REJECT_ORDER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rest of Agent views remain (Hawkers tracking, etc.) */}
      </main>
    </div>
  );
}
