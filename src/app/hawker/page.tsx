"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [payMode, setPayMode] = useState<'CASH' | 'ONLINE'>('CASH');
  
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', phone: '9876543210', address: 'Flat 402, Green Valley, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID', bill_date: '05 May 2026', plan: 'PREMIUM_MONTHLY', area: 'Sector 4' },
    { id: 'C105', name: 'Suresh Kumar', phone: '9988776655', address: 'B-12, Rose Villa, Pitampura', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING', plan: 'BASIC_DAILY', area: 'Pitampura Block B' },
    { id: 'C106', name: 'Daily Needs Store', phone: '9122334455', address: 'Shop No. 5, Market, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID', bill_date: '05 May 2026', plan: 'COMMERCIAL_WEEKLY', area: 'Main Market' },
    { id: 'C107', name: 'Priya Singh', phone: '9555666777', address: 'H.No 124, Gali 3, Rohini', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING', plan: 'PREMIUM_MONTHLY', area: 'Sector 4' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const totalCollection = deliveries
    .filter(d => d.payment_status === 'PAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const executeBillSubmission = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED', pay_mode: payMode, bill_date: new Date().toLocaleDateString() } : d));
    setNotification(`Bill for ${selectedReceipt.name} Submitted!`);
    setSelectedReceipt(null);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.phone.includes(searchTerm) || 
      d.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === 'PENDING') return d.payment_status === 'PENDING';
    if (filter === 'PAID') return d.payment_status === 'PAID';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && (
          <div className="fixed top-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 animate-slide-in">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <p className="text-xs font-black uppercase tracking-widest">{notification}</p>
          </div>
        )}

        {/* Header Section */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div className="flex items-center gap-6">
             <div className="hidden md:flex w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm items-center justify-center text-indigo-600 font-black italic">F</div>
             <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 leading-none mb-2">MY_ROUTE_TERMINAL</h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">AGENT: SITA RAM AGENCY | Sector 4 - Rohini</p>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search Name, Phone, Area..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
              />
            </div>
            <div className="flex gap-2">
               <button onClick={() => setShowHistoryModal(true)} className="bg-white border border-slate-100 text-slate-600 px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">HISTORY</button>
               <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all">SUBMIT_CASH</button>
            </div>
          </div>
        </header>

        {/* List Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 text-xs font-black uppercase text-slate-400 tracking-widest flex items-center justify-between">
             <span>CUSTOMER_LOG: {filter}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_&_ID</th>
                  <th className="px-8 py-5">AREA_/_ADDRESS</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">SETTLEMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 transition-all"><UserCircle2 size={24} /></div>
                           <div>
                              <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.id}</p>
                           </div>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight leading-relaxed">{item.address}</p>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 italic">₹{item.amount}</td>
                    <td className="px-8 py-6 text-right">
                      {item.payment_status === 'PENDING' ? (
                        <button onClick={() => setSelectedReceipt(item)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all">MARK_PAID</button>
                      ) : (
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 size={12} /> SETTLED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Enhanced Settlement & Full Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-8 md:p-12 shadow-2xl relative animate-scale-in overflow-hidden flex flex-col max-h-[95vh]">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-10"><X size={24} /></button>
            
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="text-center mb-10 border-b border-dashed pb-8">
                 <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">BILL_SUBMISSION_TERMINAL</h2>
                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">VERIFY_FULL_CUSTOMER_DATA</p>
              </div>

              {/* Full Customer Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><User size={12} /> CUSTOMER_NAME</p>
                    <p className="text-sm font-black text-slate-800 uppercase italic leading-none">{selectedReceipt.name}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Phone size={12} /> MOBILE_NUMBER</p>
                    <p className="text-sm font-black text-slate-800 italic">{selectedReceipt.phone}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 md:col-span-2">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={12} /> FULL_ADDRESS</p>
                    <p className="text-xs font-black text-slate-700 uppercase italic leading-relaxed">{selectedReceipt.address}</p>
                 </div>
                 <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Tag size={12} /> SUBSCRIPTION_PLAN</p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">{selectedReceipt.plan}</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Hash size={12} /> CUSTOMER_ID</p>
                    <p className="text-sm font-black text-slate-800">{selectedReceipt.id}</p>
                 </div>
              </div>

              {/* Payment Mode Selection */}
              <div className="space-y-4 mb-10 text-center">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">SELECT_COLLECTION_MODE</p>
                 <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                   <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'CASH' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <DollarSign size={14} /> CASH
                   </button>
                   <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'ONLINE' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <QrCode size={14} /> ONLINE
                   </button>
                 </div>
              </div>

              {/* Amount Display */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] mb-10 flex justify-between items-center shadow-2xl">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">FINAL_BILL_AMOUNT</p>
                    <p className="text-3xl font-black text-white italic">₹{selectedReceipt.amount}</p>
                 </div>
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Printer size={24} />
                 </div>
              </div>
            </div>

            <button 
              onClick={() => executeBillSubmission(selectedReceipt.id)}
              className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 size={18} /> SUBMIT_DIGITAL_BILL_TO_AGENT
            </button>
          </div>
        </div>
      )}

      {/* History Modal (Same as before) */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-2xl w-full rounded-[3rem] p-10 shadow-2xl relative flex flex-col max-h-[85vh]">
            <button onClick={() => setShowHistoryModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-8 text-center">SETTLEMENT_HISTORY</h2>
            <div className="overflow-y-auto space-y-4 pr-2 scrollbar-hide">
               {deliveries.filter(d => d.payment_status === 'PAID').map(d => (
                 <div key={d.id} className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center">
                    <p className="text-xs font-black text-slate-800 uppercase italic">{d.name}</p>
                    <p className="text-lg font-black text-slate-900 italic">₹{d.amount}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
