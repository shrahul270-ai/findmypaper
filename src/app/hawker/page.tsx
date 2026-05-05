"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID' },
    { id: 'C105', name: 'Suresh Kumar', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Needs Store', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'ADVANCED' },
    { id: 'C107', name: 'Priya Singh', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleDownloadCSV = (e: React.MouseEvent) => {
    e.preventDefault();
    setNotification("Settlement CSV generated and downloaded!");
    setTimeout(() => setNotification(null), 3000);
  };

  const markAsPaid = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED' } : d));
    setNotification("Payment marked as PAID and Delivered!");
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
    if (filter === 'PENDING') return d.status === 'PENDING';
    if (filter === 'PAID') return d.payment_status === 'PAID' || d.payment_status === 'ADVANCED';
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
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all"
            >
              <FileSpreadsheet size={16} className="text-green-600" />
              DOWNLOAD_SETTLEMENT_CSV
            </button>
            <button 
              onClick={() => {
                setAttendanceMarked(true);
                setNotification("Attendance marked successfully!");
                setTimeout(() => setNotification(null), 3000);
              }}
              disabled={attendanceMarked}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all",
                attendanceMarked ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white shadow-indigo-100 hover:scale-105"
              )}
            >
              <Camera size={16} />
              {attendanceMarked ? "ATTENDANCE_DONE" : "MARK_ATTENDANCE"}
            </button>
          </div>
        </header>

        {/* Clickable Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => setFilter('PAID')}
            className={cn("bg-white p-8 rounded-[2rem] border-2 transition-all cursor-pointer hover:scale-105", filter === 'PAID' ? "border-indigo-600 shadow-xl" : "border-slate-50 shadow-sm")}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><DollarSign size={24} /></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CASH_COLLECTED</p>
            </div>
            <p className="text-4xl font-black text-slate-900 italic">₹1,650</p>
          </div>

          <div 
            onClick={() => setFilter('ALL')}
            className={cn("bg-white p-8 rounded-[2rem] border-2 transition-all cursor-pointer hover:scale-105", filter === 'ALL' ? "border-indigo-600 shadow-xl" : "border-slate-50 shadow-sm")}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle2 size={24} /></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOTAL_ROUTE_JOBS</p>
            </div>
            <p className="text-4xl font-black text-slate-900 italic">{deliveries.length}</p>
          </div>

          <div 
            onClick={() => setFilter('PENDING')}
            className={cn("bg-white p-8 rounded-[2rem] border-2 transition-all cursor-pointer hover:scale-105", filter === 'PENDING' ? "border-indigo-600 shadow-xl" : "border-slate-50 shadow-sm")}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={24} /></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PENDING_TASKS</p>
            </div>
            <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'PENDING').length}</p>
          </div>
        </div>

        {/* Customer & Settlement List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg"><Navigation size={20} /></div>
               <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">SETTLEMENT_LOG: MY_CUSTOMERS {filter !== 'ALL' && `(${filter})`}</h2>
            </div>
            {filter !== 'ALL' && <button onClick={() => setFilter('ALL')} className="text-[10px] font-black text-indigo-600 uppercase border border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all">CLEAR_FILTER</button>}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_&_PROFILE</th>
                  <th className="px-8 py-5">DELIVERY</th>
                  <th className="px-8 py-5">PAYMENT_STATUS</th>
                  <th className="px-8 py-5">BILL_AMOUNT</th>
                  <th className="px-8 py-5 text-right">SETTLEMENT_ACTION</th>
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
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.id} | {item.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {item.status === 'DELIVERED' ? (
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full uppercase tracking-widest">
                            <CheckCircle2 size={10} /> DELIVERED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                            <Circle size={10} /> PENDING
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         {item.payment_status === 'PAID' ? (
                           <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest">
                              <DollarSign size={10} /> PAID
                           </span>
                         ) : item.payment_status === 'ADVANCED' ? (
                           <span className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
                              <Wallet size={10} /> ADVANCED
                           </span>
                         ) : (
                           <span className="flex items-center gap-1.5 text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase tracking-widest">
                              <Clock size={10} /> PENDING
                           </span>
                         )}
                         <span className="text-[8px] font-bold text-slate-400 uppercase italic">({item.pay_mode})</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 italic tracking-tighter">₹{item.amount}</td>
                    <td className="px-8 py-6 text-right">
                      {item.payment_status === 'PENDING' ? (
                        <button 
                          onClick={() => markAsPaid(item.id)}
                          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all"
                        >
                          MARK_PAID
                        </button>
                      ) : (
                        <div className="flex justify-end items-center gap-2 text-emerald-500">
                           <span className="text-[9px] font-black uppercase tracking-widest">SETTLED</span>
                           <CheckCircle2 size={16} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
