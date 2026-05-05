"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award, BookOpen, Layers, BarChart3, Activity, PhoneCall, XCircle, History, MessageSquare, RefreshCw
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

// Helper for Mini Bar Chart
const MiniBarChart = () => (
  <div className="flex items-end gap-1 h-12">
    {[30, 60, 45, 90, 50, 75, 40].map((h, i) => (
      <div key={i} style={{ height: `${h}%` }} className={cn("w-1.5 rounded-full transition-all duration-500", i === 3 ? "bg-emerald-500" : "bg-slate-200 group-hover:bg-indigo-400")}></div>
    ))}
  </div>
);

export default function HawkerDashboard() {
  const [activeTab, setActiveTab] = useState<'DELIVERIES' | 'SUPPLY' | 'EARNINGS' | 'ATTENDANCE' | 'HISTORY'>('DELIVERIES');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOnline, setSelectedOnline] = useState<any>(null);
  const [editableAmount, setEditableAmount] = useState<string>('');
  
  const todayDate = "05 May 2026";

  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '+91 98765 43210', status: 'PAID', amount: 450, payment_status: 'PAID', mode: 'CASH', time: '10:30 AM' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '+91 99887 76655', status: 'PENDING', amount: 320, payment_status: 'PENDING', mode: null, time: '11:15 AM' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '+91 95556 66777', status: 'REJECTED', amount: 500, payment_status: 'REJECTED', mode: 'ONLINE', time: '09:00 AM', reason: 'Incorrect UTR number. Please resubmit clear screenshot.' },
  ]);

  const handleQuickPay = (id: string, mode: 'CASH' | 'ONLINE') => {
    const item = deliveries.find(d => d.id === id);
    if (mode === 'CASH') {
      setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', mode: 'CASH' } : d));
    } else {
      setSelectedOnline(item);
      setEditableAmount(item?.amount.toString() || '0');
    }
  };

  const confirmOnlinePayment = () => {
    if (selectedOnline) {
      setDeliveries(prev => prev.map(d => d.id === selectedOnline.id ? { ...d, payment_status: 'PENDING', mode: 'ONLINE' } : d));
      setSelectedOnline(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">HAWKER_TERMINAL: v6.0</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">OPERATION_CONSOLE</h1>
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
            {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE', 'HISTORY'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === tab ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}>
                {tab === 'HISTORY' ? 'PAID_HISTORY' : tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300 space-y-10">
             {/* Urgent Notifications (Rejected Bills) */}
             {deliveries.some(d => d.payment_status === 'REJECTED') && (
               <section>
                  <div className="flex items-center gap-3 mb-6 px-4">
                     <div className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center shadow-lg animate-pulse"><AlertCircle size={16} /></div>
                     <h2 className="text-xl font-black text-rose-600 uppercase italic tracking-tighter">ACTION_REQUIRED: REJECTED_BILLS</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {deliveries.filter(d => d.payment_status === 'REJECTED').map(item => (
                       <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-rose-100 shadow-xl relative overflow-hidden group">
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><User size={20} /></div>
                                <div><h3 className="font-black text-slate-900 uppercase italic tracking-tight">{item.name}</h3><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₹{item.amount}</p></div>
                             </div>
                             <button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"><RefreshCw size={12} /> RE-SUBMIT</button>
                          </div>
                          <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 border-dashed">
                             <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1 italic flex items-center gap-1"><MessageSquare size={10} /> AGENT_COMMENT</p>
                             <p className="text-[11px] font-bold text-slate-700 italic">"{item.reason}"</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
             )}

             {/* Normal Queue */}
             <section>
                <div className="flex justify-between items-center mb-6 px-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg"><Clock size={16} /></div>
                      <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">DAILY_ROUTE_QUEUE</h2>
                   </div>
                   <div className="relative w-48 text-slate-900">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                      <input type="text" placeholder="SEARCH..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase shadow-sm outline-none" />
                   </div>
                </div>
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                   <table className="w-full text-left">
                      <tbody className="divide-y divide-slate-50">
                         {deliveries.filter(d => d.payment_status === 'PENDING').map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-all">
                               <td className="px-8 py-6 flex items-center gap-4">
                                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><User size={20} /></div>
                                  <div><p className="font-black text-slate-800 uppercase italic text-sm tracking-tight">{item.name}</p><p className="text-[10px] text-slate-400 font-black uppercase">{item.paper}</p></div>
                               </td>
                               <td className="px-8 py-6 font-black text-slate-900 text-lg italic">₹{item.amount}</td>
                               <td className="px-8 py-6 text-right">
                                  <div className="flex justify-end gap-3"><button onClick={() => handleQuickPay(item.id, 'CASH')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">CASH</button><button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">ONLINE</button></div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </section>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'HISTORY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-10 flex justify-between items-center">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">PAYMENT_HISTORY</h1>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase italic tracking-widest"><History size={14}/> SYNCED_WITH_AGENT</div>
             </header>
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden p-6 space-y-4 text-slate-900">
                {deliveries.filter(d => d.payment_status === 'PAID').map((tx, i) => (
                   <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-600 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><CheckCircle2 size={20} /></div>
                         <div><p className="font-black text-slate-800 uppercase italic text-sm tracking-tight">{tx.name}</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tx.time} | {tx.mode}</p></div>
                      </div>
                      <p className="text-xl font-black text-slate-900 italic tracking-tighter">₹{tx.amount}</p>
                   </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Online Modal */}
      {selectedOnline && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in text-center">
             <button onClick={() => setSelectedOnline(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><XCircle size={24} /></button>
             <div className="mb-8 border-b border-dashed pb-6"><h2 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">ONLINE_TERMINAL</h2><p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">{selectedOnline.name}</p></div>
             <div className="animate-in fade-in zoom-in duration-500 mb-10 flex flex-col items-center"><div className="bg-slate-50 w-48 h-48 rounded-[2rem] border-4 border-white shadow-2xl flex items-center justify-center"><QrCode size={110} className="text-slate-800" /></div><p className="mt-5 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] animate-pulse">SCAN_AGENT_QR_CODE</p></div>
             <div className="bg-slate-900 p-8 rounded-[2.5rem] mb-10 shadow-xl text-center"><p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">VERIFY_BILL_AMOUNT</p><div className="flex items-center justify-center gap-3"><span className="text-3xl font-black text-indigo-500 italic">₹</span><input type="number" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value)} className="bg-transparent text-3xl font-black text-white italic outline-none w-24 tracking-tighter" /></div></div>
             <button onClick={confirmOnlinePayment} className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"><ShieldCheck size={18} /> CONFIRM_&_RESUBMIT</button>
          </div>
        </div>
      )}
    </div>
  );
}
