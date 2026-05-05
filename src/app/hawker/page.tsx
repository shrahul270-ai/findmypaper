"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', phone: '9876543210', address: 'Flat 402, Green Valley, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID', bill_date: '05 May 2026' },
    { id: 'C105', name: 'Suresh Kumar', phone: '9988776655', address: 'B-12, Rose Villa, Pitampura', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Needs Store', phone: '9122334455', address: 'Shop No. 5, Market, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID', bill_date: '05 May 2026' },
    { id: 'C107', name: 'Priya Singh', phone: '9555666777', address: 'H.No 124, Gali 3, Rohini', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const totalCashCollected = deliveries
    .filter(d => d.pay_mode === 'CASH' && d.payment_status === 'PAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const executeBillSubmission = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED', bill_date: new Date().toLocaleDateString() } : d));
    setNotification("Digital Bill Generated!");
    setSelectedReceipt(null);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.phone.includes(searchTerm) || 
      d.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === 'PENDING') return d.status === 'PENDING';
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

        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">MY_ROUTE_TERMINAL</h1>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Sector 4 - Rohini | 05 May 2026</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search Name, Phone, Area..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all flex items-center gap-2">
                <Wallet size={16} /> SUBMIT_CASH
              </button>
              <button onClick={() => { setAttendanceMarked(true); }} disabled={attendanceMarked} className={cn("bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg", attendanceMarked && "bg-slate-200 text-slate-400 shadow-none")}>
                <Camera size={16} /> {attendanceMarked ? "DONE" : "ATTENDANCE"}
              </button>
            </div>
          </div>
        </header>

        {/* Clickable Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div onClick={() => setFilter('PAID')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'PAID' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><DollarSign size={14} /> TODAY_CASH</p>
              <p className="text-4xl font-black text-slate-900 italic">₹{totalCashCollected}</p>
           </div>
           <div onClick={() => setFilter('ALL')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'ALL' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircle2 size={14} /> COMPLETED</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'DELIVERED').length}/{deliveries.length}</p>
           </div>
           <div onClick={() => setFilter('PENDING')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'PENDING' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> PENDING</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'PENDING').length}</p>
           </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
             <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">SETTLEMENT_LOG: {filter}</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_DATA</th>
                  <th className="px-8 py-5">AREA_ADDRESS</th>
                  <th className="px-8 py-5">PAY_MODE</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest italic">No customers match your search criteria.</td>
                  </tr>
                ) : (
                  filteredDeliveries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                             <UserCircle2 size={24} />
                          </div>
                          <div>
                             <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                             <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{item.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight max-w-[200px] leading-relaxed">{item.address}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                            {item.pay_mode === 'CASH' ? <DollarSign size={12} /> : <CreditCard size={12} />} {item.pay_mode}
                         </span>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-900 italic">₹{item.amount}</td>
                      <td className="px-8 py-6 text-right">
                        {item.payment_status === 'PENDING' ? (
                          <button onClick={() => setSelectedReceipt(item)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">MARK_PAID</button>
                        ) : (
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 size={12} /> SETTLED</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Digital Receipt Modal (Existing) */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-md w-full rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <div className="text-center mb-8 border-b border-dashed pb-8">
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"><Printer size={32} /></div>
               <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">DIGITAL_INVOICE</h2>
            </div>
            <div className="space-y-4 mb-8">
               <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Customer</span><span className="text-sm font-black text-slate-800 uppercase italic">{selectedReceipt.name}</span></div>
               <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Amount</span><span className="text-xl font-black text-slate-900 italic">₹{selectedReceipt.amount}</span></div>
               <div className="flex justify-between"><span className="text-[10px] font-black text-slate-400 uppercase">Mode</span><span className="text-xs font-black text-indigo-600 uppercase">{selectedReceipt.pay_mode}</span></div>
            </div>
            <button onClick={() => executeBillSubmission(selectedReceipt.id)} className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs tracking-widest uppercase shadow-2xl">CONFIRM_&_GENERATE_BILL</button>
          </div>
        </div>
      )}

      {/* Cash Modal (Existing) */}
      {showCashModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in">
            <button onClick={() => setShowCashModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter">SUBMIT_CASH_TO_AGENT</h2>
            <div className="bg-slate-50 p-8 rounded-[2rem] text-center border mb-10"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">TOTAL_CASH_AMOUNT</p><p className="text-5xl font-black text-indigo-600 italic tracking-tighter">₹{totalCashCollected}</p></div>
            <button onClick={() => { setNotification(`₹${totalCashCollected} Cash submitted!`); setShowCashModal(false); }} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3"><Send size={18} /> CONFIRM_&_SEND_TO_AGENT</button>
          </div>
        </div>
      )}
    </div>
  );
}
