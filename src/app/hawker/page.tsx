"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID' },
    { id: 'C105', name: 'Suresh Kumar', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Needs Store', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID' },
    { id: 'C107', name: 'Priya Singh', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const totalCashCollected = deliveries
    .filter(d => d.pay_mode === 'CASH' && d.payment_status === 'PAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleCashSubmit = () => {
    setNotification(`₹${totalCashCollected} Cash Submission sent to Agent for approval!`);
    setShowCashModal(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const markAsPaid = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED' } : d));
    setNotification("Payment marked as PAID!");
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
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

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">MY_ROUTE_TERMINAL</h1>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Sector 4 - Rohini | 05 May 2026</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCashModal(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all"
            >
              <Wallet size={16} />
              SUBMIT_CASH_TO_AGENT
            </button>
            <button 
              onClick={() => {
                setAttendanceMarked(true);
                setNotification("Attendance marked!");
                setTimeout(() => setNotification(null), 3000);
              }}
              disabled={attendanceMarked}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all",
                attendanceMarked ? "bg-slate-200 text-slate-500" : "bg-indigo-600 text-white shadow-indigo-100"
              )}
            >
              <Camera size={16} />
              {attendanceMarked ? "DONE" : "ATTENDANCE"}
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div onClick={() => setFilter('PAID')} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-600 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><DollarSign size={14} /> TODAY_CASH_COLLECTED</p>
              <p className="text-4xl font-black text-slate-900 italic">₹{totalCashCollected}</p>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircle2 size={14} /> COMPLETED</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'DELIVERED').length}/{deliveries.length}</p>
           </div>
           <div onClick={() => setFilter('PENDING')} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:border-amber-500 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> PENDING_DELIVERIES</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'PENDING').length}</p>
           </div>
        </div>

        {/* Customer & Settlement List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
             <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">SETTLEMENT_LOG: MY_CUSTOMERS</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_&_PROFILE</th>
                  <th className="px-8 py-5">STATUS</th>
                  <th className="px-8 py-5">PAY_MODE</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           <UserCircle2 size={24} />
                        </div>
                        <div>
                           <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn("text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest", item.status === 'DELIVERED' ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50")}>
                          {item.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                          {item.pay_mode === 'CASH' ? <DollarSign size={12} /> : <CreditCard size={12} />} {item.pay_mode}
                       </span>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 italic">₹{item.amount}</td>
                    <td className="px-8 py-6 text-right">
                      {item.payment_status === 'PENDING' ? (
                        <button onClick={() => markAsPaid(item.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">MARK_PAID</button>
                      ) : (
                        <span className="text-[9px] font-black text-emerald-500 uppercase">SETTLED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Cash Submission Modal */}
      {showCashModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in">
            <button onClick={() => setShowCashModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter">SUBMIT_CASH_TO_AGENT</h2>
            
            <div className="space-y-6">
               <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100 shadow-inner">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">TOTAL_CASH_AMOUNT</p>
                  <p className="text-5xl font-black text-indigo-600 italic tracking-tighter">₹{totalCashCollected}</p>
               </div>

               <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">CASH_COLLECTED_FROM_CUSTOMERS:</p>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                     {deliveries.filter(d => d.pay_mode === 'CASH' && d.payment_status === 'PAID').map(d => (
                       <div key={d.id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl">
                          <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{d.name}</span>
                          <span className="text-xs font-black text-slate-900 italic">₹{d.amount}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <button 
                onClick={handleCashSubmit}
                className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
               >
                 <Send size={18} /> CONFIRM_&_SEND_TO_AGENT
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
