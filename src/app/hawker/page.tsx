"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award, BookOpen, Layers, BarChart3, Activity, PhoneCall, XCircle, History, MessageSquare
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

  const inventorySupply = [
    { type: 'PAPER', name: 'Dainik Bhaskar', qty: 45, agentPrice: 3.50, custPrice: 5.00, margin: 1.50 },
    { type: 'PAPER', name: 'Times of India', qty: 30, agentPrice: 4.00, custPrice: 6.00, margin: 2.00 },
    { type: 'MAGAZINE', name: 'India Today', qty: 12, agentPrice: 25.00, custPrice: 35.00, margin: 10.00 },
    { type: 'BOOK', name: 'NCRT Textbook', qty: 5, agentPrice: 180.00, custPrice: 220.00, margin: 40.00 },
  ];

  const totalMarginToday = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.margin), 0);
  const grandTotalEarnings = 15420.50 + totalMarginToday;

  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '+91 98765 43210', status: 'PAID', amount: 450, payment_status: 'PAID', mode: 'CASH', time: '10:30 AM' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '+91 99887 76655', status: 'PENDING', amount: 320, payment_status: 'PENDING', mode: null, time: '11:15 AM' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '+91 95556 66777', status: 'REJECTED', amount: 500, payment_status: 'REJECTED', mode: 'ONLINE', time: '09:00 AM', reason: 'Incorrect UTR number provided' },
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
      setDeliveries(prev => prev.map(d => d.id === selectedOnline.id ? { ...d, payment_status: 'PENDING', mode: 'ONLINE' } : d)); // Set to pending for Agent approval
      setSelectedOnline(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-8 overflow-x-auto scrollbar-hide max-w-3xl">
           {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE', 'HISTORY'].map((tab) => (
             <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}>
               {tab === 'SUPPLY' ? 'INVENTORY' : tab === 'HISTORY' ? 'TRANSACTIONS' : tab}
             </button>
           ))}
        </div>

        {/* Deliveries & Real-time History List */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p>
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">ROUTE_TERMINAL</h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <div className="relative flex-1 md:w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="SEARCH CUSTOMER..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none" />
                   </div>
                </div>
             </header>

             {/* Dynamic Delivery Queue */}
             <div className="space-y-4">
                {deliveries.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                   <div key={item.id} className={cn("bg-white p-6 rounded-[2.5rem] border shadow-sm transition-all relative overflow-hidden", 
                      item.payment_status === 'REJECTED' ? "border-rose-100 bg-rose-50/10" : "border-slate-100"
                   )}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                         <div className="flex items-center gap-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black italic", 
                               item.payment_status === 'PAID' ? "bg-emerald-50 text-emerald-600" : 
                               item.payment_status === 'REJECTED' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                            )}>
                               <User size={24} />
                            </div>
                            <div>
                               <h3 className="font-black text-slate-900 uppercase italic text-lg tracking-tighter">{item.name}</h3>
                               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.paper} | {item.phone}</p>
                            </div>
                         </div>

                         <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <p className="text-2xl font-black italic text-slate-900 tracking-tighter">₹{item.amount}</p>
                            <div className="flex gap-3">
                               {item.payment_status === 'PENDING' ? (
                                  <>
                                     <button onClick={() => handleQuickPay(item.id, 'CASH')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">CASH</button>
                                     <button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">ONLINE</button>
                                  </>
                               ) : item.payment_status === 'REJECTED' ? (
                                  <button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                                     <RefreshCw size={12} /> RE-SUBMIT
                                  </button>
                               ) : (
                                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                     <ShieldCheck size={14} />
                                     <span className="text-[9px] font-black uppercase tracking-widest">SETTLED</span>
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>

                      {/* Rejection Notification with Comment */}
                      {item.payment_status === 'REJECTED' && (
                         <div className="mt-4 p-4 bg-white rounded-2xl border border-rose-100 border-dashed animate-pulse">
                            <div className="flex items-center gap-2 text-rose-600 mb-1">
                               <XCircle size={14} />
                               <span className="text-[10px] font-black uppercase tracking-widest">BILL_REJECTED_BY_AGENT</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-600 italic">"Reason: {item.reason}"</p>
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* PhonePe Style Transaction History */}
        {activeTab === 'HISTORY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-10">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none mb-2">TRANSACTION_HISTORY</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All settlements since May 01, 2026</p>
             </header>

             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden p-6">
                <div className="relative mb-8">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input 
                    type="text" 
                    placeholder="SEARCH BY CUSTOMER NAME..." 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase shadow-inner"
                   />
                </div>

                <div className="space-y-6">
                   {deliveries.filter(d => d.payment_status !== 'PENDING').map((tx, i) => (
                      <div key={i} className="flex justify-between items-center p-5 border-b border-slate-50 hover:bg-slate-50 transition-all rounded-2xl">
                         <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                               tx.payment_status === 'PAID' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                               {tx.payment_status === 'PAID' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                            </div>
                            <div>
                               <p className="font-black text-slate-800 uppercase italic text-sm tracking-tight">{tx.name}</p>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tx.time} | {tx.mode}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-lg font-black text-slate-900 italic tracking-tighter">₹{tx.amount}</p>
                            <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md", 
                               tx.payment_status === 'PAID' ? "text-emerald-500 bg-emerald-50" : "text-rose-500 bg-rose-50"
                            )}>
                               {tx.payment_status}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* Other Sections (Inventory, Earnings, Attendance) */}
        {activeTab === 'SUPPLY' && (
           <div className="animate-in fade-in zoom-in duration-300">
              <header className="mb-10 flex justify-between items-center"><div><p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p><h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">INVENTORY_BREAKDOWN</h1></div></header>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden p-6"><table className="w-full text-left"><thead><tr className="text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20"><th className="px-6 py-4">ITEM</th><th className="px-6 py-4">AGENT_CP</th><th className="px-6 py-4">CUST_SP</th><th className="px-6 py-4 text-right">MARGIN</th></tr></thead><tbody className="divide-y divide-slate-50">{inventorySupply.map((p, i) => (<tr key={i}><td className="px-6 py-4 font-black text-slate-800 text-sm uppercase italic">{p.name} <span className="text-slate-400 ml-1">(x{p.qty})</span></td><td className="px-6 py-4 text-indigo-600 font-black text-xs">₹{p.agentPrice}</td><td className="px-8 py-6 font-black text-emerald-600 text-xs italic">₹{p.custPrice}</td><td className="px-6 py-4 text-right font-black text-slate-900 text-lg italic">₹{(p.qty * p.margin).toFixed(2)}</td></tr>))}</tbody></table></div>
           </div>
        )}

        {activeTab === 'EARNINGS' && (
           <div className="animate-in fade-in zoom-in duration-300 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group flex justify-between items-start"><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Clock size={14} /> TODAY_NET_PROFIT</p><p className="text-5xl font-black italic tracking-tighter text-slate-900">₹{totalMarginToday.toFixed(2)}</p></div><MiniBarChart /></div>
                 <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex justify-between items-start"><div><p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><TrendingUp size={14} /> RUNNING_TOTAL</p><p className="text-5xl font-black italic tracking-tighter text-emerald-400">₹{grandTotalEarnings.toFixed(2)}</p></div><MiniBarChart /></div>
              </div>
           </div>
        )}

        {activeTab === 'ATTENDANCE' && (
           <div className="animate-in fade-in zoom-in duration-300">
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                 <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-8 border-2 border-emerald-100 animate-pulse"><CheckCircle2 size={48} /></div>
                 <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">PRESENT_&_LOGGED</h3>
                 <div className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-2.5 rounded-2xl shadow-xl shadow-emerald-500/20 mb-8"><ShieldCheck size={18} /><span className="text-[11px] font-black uppercase tracking-[0.2em]">VERIFIED_BY_AGENT</span></div>
                 <Building2 className="absolute -left-10 -bottom-10 w-48 h-48 text-slate-50 -rotate-12" />
              </div>
           </div>
        )}
      </main>

      {/* Re-submission / Online Modal */}
      {selectedOnline && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-sm w-full rounded-[3rem] p-8 md:p-10 shadow-2xl relative animate-scale-in text-center text-slate-900">
             <button onClick={() => setSelectedOnline(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-20"><X size={24} /></button>
             <div className="mb-8 border-b border-dashed pb-6">
                <h2 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">ONLINE_TERMINAL</h2>
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">{selectedOnline.name}</p>
             </div>
             <div className="animate-in fade-in zoom-in duration-500 mb-10 flex flex-col items-center">
                <div className="bg-slate-50 w-48 h-48 rounded-[2rem] border-4 border-white shadow-2xl flex items-center justify-center"><QrCode size={110} className="text-slate-800" /></div>
                <p className="mt-5 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] animate-pulse">SCAN_AGENT_QR_CODE</p>
             </div>
             <div className="bg-slate-900 p-8 rounded-[2.5rem] mb-10 shadow-xl">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">VERIFY_BILL_AMOUNT</p>
                <div className="flex items-center justify-center gap-3">
                   <span className="text-3xl font-black text-indigo-500 italic">₹</span>
                   <input type="number" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value)} className="bg-transparent text-3xl font-black text-white italic outline-none w-24 tracking-tighter" />
                </div>
             </div>
             <button onClick={confirmOnlinePayment} className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"><ShieldCheck size={18} /> CONFIRM_&_RESUBMIT</button>
          </div>
        </div>
      )}
    </div>
  );
}
