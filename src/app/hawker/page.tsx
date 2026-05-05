"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [activeTab, setActiveTab] = useState<'DELIVERIES' | 'SUPPLY' | 'EARNINGS' | 'ATTENDANCE'>('DELIVERIES');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [editableAmount, setEditableAmount] = useState<string>('');
  const [payMode, setPayMode] = useState<'CASH' | 'ONLINE'>('CASH');

  // Inventory Data
  const paperSupply = [
    { name: 'Dainik Bhaskar', quantity: 45, adjustment: -2, final: 43, commission: 1.50 },
    { name: 'Times of India', quantity: 30, adjustment: 0, final: 30, commission: 2.00 },
    { name: 'Amar Ujala', quantity: 20, adjustment: -1, final: 19, commission: 1.25 },
    { name: 'Magazine (Weekly)', quantity: 10, adjustment: 0, final: 10, commission: 5.00 },
  ];

  // Attendance History
  const attendanceLogs = [
    { date: '05 May 2026', status: 'PRESENT', time: '05:30 AM', photo: true },
    { date: '04 May 2026', status: 'PRESENT', time: '05:45 AM', photo: true },
    { date: '03 May 2026', status: 'ABSENT', time: '-', photo: false },
    { date: '02 May 2026', status: 'PRESENT', time: '05:15 AM', photo: true },
  ];

  // Deliveries Data with Paper Mapping
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '9876543210', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID', plan: 'MONTHLY' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '9988776655', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING', plan: 'DAILY' },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '9122334455', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID', plan: 'COMMERCIAL' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '9555666777', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'ONLINE', amount: 500, payment_status: 'PENDING', plan: 'MONTHLY' },
  ]);

  const totalEarnings = paperSupply.reduce((acc, curr) => acc + (curr.final * curr.commission), 0);

  const filteredDeliveries = deliveries.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Top Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm mb-8 overflow-x-auto whitespace-nowrap">
           <button onClick={() => setActiveTab('DELIVERIES')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'DELIVERIES' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>MY_DELIVERIES</button>
           <button onClick={() => setActiveTab('SUPPLY')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'SUPPLY' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>INVENTORY_SUPPLY</button>
           <button onClick={() => setActiveTab('EARNINGS')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'EARNINGS' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>MY_EARNINGS</button>
           <button onClick={() => setActiveTab('ATTENDANCE')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'ATTENDANCE' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>ATTENDANCE_LOG</button>
        </div>

        {/* Tab Content: Deliveries */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
                <div>
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 leading-none mb-2">DELIVERY_TERMINAL</h1>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><MapPin size={12} /> Sector 4 - Rohini Route</p>
                </div>
                <div className="flex gap-4 w-full xl:w-auto">
                   <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="Search Customer or Area..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                   </div>
                </div>
             </header>

             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                      <th className="px-8 py-5">CUSTOMER_&_PAPER</th>
                      <th className="px-8 py-5">ADDRESS</th>
                      <th className="px-8 py-5">AMOUNT</th>
                      <th className="px-8 py-5 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredDeliveries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all"><UserCircle2 size={24} /></div>
                              <div>
                                 <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic">{item.name}</p>
                                 <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest flex items-center gap-1"><Newspaper size={10} /> {item.paper}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase italic tracking-tight">{item.address}</td>
                        <td className="px-8 py-6 font-black text-slate-900 italic">₹{item.amount}</td>
                        <td className="px-8 py-6 text-right">
                           <button onClick={() => { setSelectedReceipt(item); setEditableAmount(item.amount.toString()); }} className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest", item.payment_status === 'PAID' ? "text-emerald-500 bg-emerald-50" : "bg-indigo-600 text-white shadow-lg")}>
                              {item.payment_status === 'PAID' ? 'SETTLED' : 'MARK_PAID'}
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Tab Content: Supply Inventory */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">TOTAL_PAPERS</p>
                   <p className="text-4xl font-black text-slate-900 italic">{paperSupply.reduce((a,b) => a+b.final, 0)}</p>
                </div>
                <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 shadow-sm">
                   <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">ADJUSTMENTS</p>
                   <p className="text-4xl font-black text-amber-700 italic">{paperSupply.reduce((a,b) => a+b.adjustment, 0)}</p>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/20 text-[10px] font-black uppercase text-slate-400 tracking-widest">TODAY_PAPER_ALLOCATION</div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400">
                            <th className="px-8 py-5">PAPER_NAME</th>
                            <th className="px-8 py-5">ISSUED_QTY</th>
                            <th className="px-8 py-5">ADJUSTMENT</th>
                            <th className="px-8 py-5">FINAL_SUPPLY</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {paperSupply.map((p) => (
                            <tr key={p.name} className="hover:bg-slate-50/50 transition-all">
                               <td className="px-8 py-6 font-black text-slate-800 text-sm italic uppercase tracking-tight">{p.name}</td>
                               <td className="px-8 py-6 font-black text-slate-600">{p.quantity}</td>
                               <td className={cn("px-8 py-6 font-black", p.adjustment < 0 ? "text-red-500" : "text-slate-400")}>{p.adjustment}</td>
                               <td className="px-8 py-6 font-black text-indigo-600 text-lg italic">{p.final}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Earnings */}
        {activeTab === 'EARNINGS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
             <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">ESTIMATED_TODAY_EARNINGS</p>
                   <p className="text-6xl font-black italic tracking-tighter mb-4">₹{totalEarnings.toFixed(2)}</p>
                   <div className="flex items-center gap-4">
                      <span className="bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Commission Based</span>
                      <span className="bg-emerald-400/20 text-emerald-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><TrendingUp size={12} /> ON_TRACK</span>
                   </div>
                </div>
                <DollarSign className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
             </div>

             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/20 text-[10px] font-black uppercase text-slate-400 tracking-widest">COMMISSION_BREAKDOWN</div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400">
                            <th className="px-8 py-5">PAPER_TYPE</th>
                            <th className="px-8 py-5">QTY</th>
                            <th className="px-8 py-5">COMM_RATE</th>
                            <th className="px-8 py-5 text-right">NET_EARNING</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {paperSupply.map((p) => (
                            <tr key={p.name} className="hover:bg-slate-50/50 transition-all">
                               <td className="px-8 py-6 font-black text-slate-800 text-sm italic uppercase">{p.name}</td>
                               <td className="px-8 py-6 font-black text-slate-600">{p.final}</td>
                               <td className="px-8 py-6 font-black text-indigo-600">₹{p.commission}/copy</td>
                               <td className="px-8 py-6 text-right font-black text-slate-900">₹{(p.final * p.commission).toFixed(2)}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Attendance */}
        {activeTab === 'ATTENDANCE' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {attendanceLogs.map((log) => (
                   <div key={log.date} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-600 transition-all">
                      <div className="flex justify-between items-start mb-6">
                         <div className={cn("p-3 rounded-2xl", log.status === 'PRESENT' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                            <Camera size={24} />
                         </div>
                         <span className={cn("text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest", log.status === 'PRESENT' ? "bg-emerald-500 text-white shadow-lg" : "bg-red-500 text-white")}>{log.status}</span>
                      </div>
                      <p className="text-lg font-black text-slate-900 uppercase italic leading-none mb-1">{log.date}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time === '-' ? 'NO_CHECK_IN' : `CHECK_IN: ${log.time}`}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

      </main>

      {/* Billing Modal (Previous Version with editable amount) */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in flex flex-col max-h-[90vh] overflow-hidden">
             <button onClick={() => setSelectedReceipt(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><X size={24} /></button>
             <div className="overflow-y-auto pr-2 scrollbar-hide flex-1">
                <div className="text-center mb-8 border-b border-dashed pb-6">
                   <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">BILLING_TERMINAL</h2>
                   <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">EDITABLE_MANUAL_SUBMISSION</p>
                </div>
                <div className="mb-8">
                   <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
                     <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all", payMode === 'CASH' ? "bg-white text-indigo-600" : "text-slate-400")}>CASH</button>
                     <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all", payMode === 'ONLINE' ? "bg-white text-indigo-600" : "text-slate-400")}>ONLINE</button>
                   </div>
                   {payMode === 'ONLINE' && (
                      <div className="animate-in fade-in zoom-in duration-500 mb-8 flex flex-col items-center">
                         <div className="bg-slate-50 w-40 h-40 rounded-[1.5rem] border-4 border-white shadow-xl flex items-center justify-center"><QrCode size={100} /></div>
                         <p className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest">SCAN_AGENT_QR</p>
                      </div>
                   )}
                   <div className="bg-slate-900 p-8 rounded-[2rem] text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">MANUAL_BILL_ENTRY</p>
                      <div className="flex items-center justify-center gap-3">
                         <span className="text-3xl font-black text-indigo-500 italic">₹</span>
                         <input type="number" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value)} className="bg-transparent text-3xl font-black text-white italic outline-none w-32 tracking-tighter" />
                      </div>
                   </div>
                </div>
             </div>
             <button onClick={() => { setDeliveries(prev => prev.map(d => d.id === selectedReceipt.id ? {...d, payment_status: 'PAID'} : d)); setSelectedReceipt(null); }} className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-widest uppercase shadow-2xl">CONFIRM_&_SUBMIT_BILL</button>
          </div>
        </div>
      )}
    </div>
  );
}
