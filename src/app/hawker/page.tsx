"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone
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
    { id: 'C104', name: 'Anil Mehta', phone: '9876543210', address: 'Flat 402, Green Valley, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID', bill_date: '05 May 2026' },
    { id: 'C105', name: 'Suresh Kumar', phone: '9988776655', address: 'B-12, Rose Villa, Pitampura', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Needs Store', phone: '9122334455', address: 'Shop No. 5, Market, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID', bill_date: '05 May 2026' },
    { id: 'C107', name: 'Priya Singh', phone: '9555666777', address: 'H.No 124, Gali 3, Rohini', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const totalCollection = deliveries
    .filter(d => d.payment_status === 'PAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSettledCount = deliveries.filter(d => d.payment_status === 'PAID').length;
  const totalPendingCount = deliveries.filter(d => d.payment_status === 'PENDING').length;

  const executeBillSubmission = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED', pay_mode: payMode, bill_date: new Date().toLocaleDateString() } : d));
    setNotification(`Digital Bill Generated!`);
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

        {/* Header with Agent Info */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div className="flex items-center gap-6">
             <div className="hidden md:flex w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm items-center justify-center text-indigo-600">
                <Building2 size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 leading-none mb-2">MY_ROUTE_TERMINAL</h1>
                <div className="flex flex-wrap items-center gap-4">
                   <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Sector 4 - Rohini</p>
                   <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <User size={12} className="text-indigo-600" /> AGENT: <span className="text-slate-600">SITA RAM AGENCY</span>
                   </p>
                   <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Phone size={12} className="text-indigo-600" /> +91 98XXX XXXX1
                   </p>
                </div>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
              />
            </div>
            <div className="flex gap-2">
               <button onClick={() => setShowHistoryModal(true)} className="bg-white border border-slate-100 text-slate-600 px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                  <ClipboardList size={14} /> HISTORY
               </button>
               <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all flex items-center gap-2">
                  <Wallet size={14} /> SUBMIT_CASH
               </button>
            </div>
          </div>
        </header>

        {/* Dynamic Interactive Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div 
             onClick={() => setFilter(filter === 'PAID' ? 'ALL' : 'PAID')} 
             className={cn("p-8 rounded-[2.5rem] border transition-all cursor-pointer group", filter === 'PAID' ? "bg-indigo-600 border-indigo-600 shadow-2xl" : "bg-white border-slate-100 shadow-sm hover:border-indigo-600")}
           >
              <p className={cn("text-[9px] font-black uppercase tracking-widest mb-4", filter === 'PAID' ? "text-indigo-200" : "text-slate-400")}>TOTAL_PAID_CASH_&_ONLINE</p>
              <p className={cn("text-4xl font-black italic tracking-tighter", filter === 'PAID' ? "text-white" : "text-slate-900")}>₹{totalCollection}</p>
           </div>
           <div onClick={() => setFilter('ALL')} className={cn("p-8 rounded-[2.5rem] border transition-all cursor-pointer group", filter === 'ALL' ? "bg-slate-900 border-slate-900 shadow-2xl" : "bg-white border-slate-100 shadow-sm hover:border-slate-900")}>
              <p className={cn("text-[9px] font-black uppercase tracking-widest mb-4", filter === 'ALL' ? "text-slate-400" : "text-slate-400")}>TODAY_COLLECTED</p>
              <p className={cn("text-4xl font-black italic tracking-tighter", filter === 'ALL' ? "text-white" : "text-slate-900")}>{totalSettledCount}</p>
           </div>
           <div onClick={() => setFilter('PENDING')} className={cn("p-8 rounded-[2.5rem] border transition-all cursor-pointer group", filter === 'PENDING' ? "bg-amber-500 border-amber-500 shadow-2xl" : "bg-white border-slate-100 shadow-sm hover:border-amber-500")}>
              <p className={cn("text-[9px] font-black uppercase tracking-widest mb-4", filter === 'PENDING' ? "text-amber-100" : "text-slate-400")}>PENDING_BILL_CUSTOMERS</p>
              <p className={cn("text-4xl font-black italic tracking-tighter", filter === 'PENDING' ? "text-white" : "text-slate-900")}>{totalPendingCount}</p>
           </div>
        </div>

        {/* Main List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 text-xs font-black uppercase text-slate-400 tracking-widest flex items-center justify-between">
             <span>LIST: {filter}</span>
             <span className="text-[10px] text-indigo-600">Showing {filteredDeliveries.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER</th>
                  <th className="px-8 py-5">MODE</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6 flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 transition-all"><UserCircle2 size={24} /></div>
                        <div>
                           <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.phone}</p>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
                          {item.payment_status === 'PAID' ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Clock size={12} className="text-amber-500" />} {item.payment_status}
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

      {/* Settlement History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-2xl w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in flex flex-col max-h-[85vh]">
            <button onClick={() => setShowHistoryModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-8 text-center">SETTLEMENT_TERMINAL_HISTORY</h2>
            
            <div className="overflow-y-auto space-y-4 pr-2 scrollbar-hide">
               {deliveries.filter(d => d.payment_status === 'PAID').map(d => (
                 <div key={d.id} className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", d.pay_mode === 'CASH' ? "bg-emerald-600" : "bg-indigo-600")}>
                          {d.pay_mode === 'CASH' ? <DollarSign size={20} /> : <QrCode size={20} />}
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase italic">{d.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{d.bill_date} • {d.pay_mode}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-slate-900 italic">₹{d.amount}</p>
                       <span className="text-[8px] font-black text-emerald-500 uppercase">SETTLED_SUCCESS</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* (Rest of modals remain same) */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative animate-scale-in flex flex-col max-h-[90vh]">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors z-10"><X size={24} /></button>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="text-center mb-6 border-b border-dashed pb-6">
                 <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">PAYMENT_TERMINAL</h2>
              </div>
              <div className="space-y-4 mb-6 text-center">
                 <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                   <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'CASH' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>CASH</button>
                   <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'ONLINE' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>ONLINE</button>
                 </div>
                 {payMode === 'ONLINE' ? (
                   <div className="animate-in fade-in zoom-in duration-300">
                      <div className="bg-slate-50 w-44 h-44 mx-auto rounded-[1.5rem] border-2 border-white shadow-lg flex items-center justify-center"><QrCode size={90} className="text-slate-800" /></div>
                      <p className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest">SCAN_AGENT_QR</p>
                   </div>
                 ) : (
                   <div className="py-4 animate-in fade-in zoom-in duration-300"><DollarSign size={32} className="mx-auto text-emerald-600" /></div>
                 )}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl mb-6 flex justify-between items-center border border-slate-100">
                 <div><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">BILL_AMOUNT</p><p className="text-xl font-black text-slate-900 italic">₹{selectedReceipt.amount}</p></div>
                 <div className="text-right"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CUSTOMER</p><p className="text-xs font-black text-slate-800 uppercase italic leading-none mt-1">{selectedReceipt.name}</p></div>
              </div>
            </div>
            <button onClick={() => executeBillSubmission(selectedReceipt.id)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] tracking-[0.15em] uppercase shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 mt-2">CONFIRM_&_GENERATE_BILL</button>
          </div>
        </div>
      )}

      {showCashModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in flex flex-col max-h-[90vh]">
            <button onClick={() => setShowCashModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-10 uppercase italic tracking-tighter">SUBMIT_CASH_TO_AGENT</h2>
            <div className="bg-slate-50 p-8 rounded-[2rem] text-center border mb-10"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">TOTAL_CASH_AMOUNT</p><p className="text-5xl font-black text-indigo-600 italic tracking-tighter">₹{totalCollection}</p></div>
            <button onClick={() => { setNotification(`₹${totalCollection} Cash submitted!`); setShowCashModal(false); }} className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl flex items-center justify-center gap-3">CONFIRM_&_SEND_TO_AGENT</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Missing import fix
const ClipboardList = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
);
