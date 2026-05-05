"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [payMode, setPayMode] = useState<'CASH' | 'ONLINE'>('CASH');
  
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
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED', pay_mode: payMode, bill_date: new Date().toLocaleDateString() } : d));
    setNotification(`Digital Bill Generated via ${payMode}!`);
    setSelectedReceipt(null);
    setPayMode('CASH');
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.phone.includes(searchTerm) || 
      d.address.toLowerCase().includes(searchTerm.toLowerCase());
    
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
            <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
               <Wallet size={16} /> SUBMIT_CASH
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div onClick={() => setFilter('PAID')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'PAID' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">TODAY_CASH</p>
              <p className="text-4xl font-black text-slate-900 italic">₹{totalCashCollected}</p>
           </div>
           <div onClick={() => setFilter('ALL')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'ALL' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">TOTAL_JOBS</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.length}</p>
           </div>
           <div onClick={() => setFilter('PENDING')} className={cn("bg-white p-8 rounded-[2.5rem] border transition-all cursor-pointer", filter === 'PENDING' ? "border-indigo-600 shadow-xl" : "border-slate-100 shadow-sm")}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">PENDING</p>
              <p className="text-4xl font-black text-slate-900 italic">{deliveries.filter(d => d.status === 'PENDING').length}</p>
           </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center text-xs font-black uppercase text-slate-400 tracking-widest">
             SETTLEMENT_LOG
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_DATA</th>
                  <th className="px-8 py-5">MODE</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6 flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all"><UserCircle2 size={24} /></div>
                        <div>
                           <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.phone}</p>
                        </div>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Digital Receipt / Payment Selection Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative animate-scale-in overflow-hidden flex flex-col max-h-[90vh]">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors z-10"><X size={24} /></button>
            
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="text-center mb-6 border-b border-dashed pb-6">
                 <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">PAYMENT_TERMINAL</h2>
                 <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">VERIFY_CUSTOMER_BILL</p>
              </div>

              <div className="space-y-4 mb-6 text-center">
                 <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                   <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'CASH' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <DollarSign size={12} /> CASH
                   </button>
                   <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'ONLINE' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <QrCode size={12} /> ONLINE
                   </button>
                 </div>

                 {payMode === 'ONLINE' ? (
                   <div className="animate-in fade-in zoom-in duration-300">
                      <div className="bg-slate-50 w-44 h-44 mx-auto rounded-[1.5rem] border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden">
                         <QrCode size={90} className="text-slate-800" />
                      </div>
                      <p className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest">SCAN_AGENT_QR_TO_PAY</p>
                   </div>
                 ) : (
                   <div className="py-4 animate-in fade-in zoom-in duration-300">
                      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                         <DollarSign size={24} />
                      </div>
                   </div>
                 )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl mb-6 flex justify-between items-center border border-slate-100">
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">BILL_AMOUNT</p>
                    <p className="text-xl font-black text-slate-900 italic">₹{selectedReceipt.amount}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CUSTOMER</p>
                    <p className="text-xs font-black text-slate-800 uppercase italic leading-none mt-1">{selectedReceipt.name}</p>
                 </div>
              </div>
            </div>

            <button 
              onClick={() => executeBillSubmission(selectedReceipt.id)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] tracking-[0.15em] uppercase shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 size={16} /> CONFIRM_&_GENERATE_BILL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
