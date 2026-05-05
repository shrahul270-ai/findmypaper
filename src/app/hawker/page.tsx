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
    { name: 'Magazine', quantity: 10, adjustment: 0, final: 10, commission: 5.00 },
  ];

  // Compact Attendance Logs
  const attendanceLogs = [
    { date: '05 May 2026', status: 'PRESENT', time: '05:30 AM', loc: 'Depot 4' },
    { date: '04 May 2026', status: 'PRESENT', time: '05:45 AM', loc: 'Depot 4' },
    { date: '03 May 2026', status: 'ABSENT', time: '-', loc: '-' },
    { date: '02 May 2026', status: 'PRESENT', time: '05:15 AM', loc: 'Depot 4' },
    { date: '01 May 2026', status: 'PRESENT', time: '05:20 AM', loc: 'Depot 4' },
  ];

  // Deliveries Data
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '9876543210', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '9988776655', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '9122334455', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '9555666777', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'ONLINE', amount: 500, payment_status: 'PENDING' },
  ]);

  const totalEarnings = paperSupply.reduce((acc, curr) => acc + (curr.final * curr.commission), 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Compact Navigation */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-x-auto scrollbar-hide">
           {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE'].map((tab) => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={cn("px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}
             >
               {tab === 'DELIVERIES' ? 'DELIVERIES' : tab === 'SUPPLY' ? 'INVENTORY' : tab === 'EARNINGS' ? 'EARNINGS' : 'ATTENDANCE'}
             </button>
           ))}
        </div>

        {/* Tab Content: Deliveries (Compact) */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">MY_ROUTE_TERMINAL</h1>
                <div className="flex gap-2">
                   <div className="relative hidden md:block">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="SEARCH..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-[8px] font-black uppercase tracking-widest outline-none w-48 shadow-sm" />
                   </div>
                   <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-emerald-50">SUBMIT_CASH</button>
                </div>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-6 py-4">CUSTOMER_DATA</th>
                      <th className="px-6 py-4 hidden md:table-cell">ADDRESS</th>
                      <th className="px-6 py-4">AMOUNT</th>
                      <th className="px-6 py-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deliveries.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                        <td className="px-6 py-4 flex items-center gap-3">
                           <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all"><User size={16} /></div>
                           <div>
                              <p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase italic">{item.name}</p>
                              <p className="text-[8px] text-indigo-600 font-black uppercase tracking-widest">{item.paper}</p>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase italic hidden md:table-cell">{item.address}</td>
                        <td className="px-6 py-4 font-black text-slate-900 text-sm italic">₹{item.amount}</td>
                        <td className="px-6 py-4 text-right">
                           <button onClick={() => { setSelectedReceipt(item); setEditableAmount(item.amount.toString()); }} className={cn("px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest", item.payment_status === 'PAID' ? "text-emerald-500 bg-emerald-50" : "bg-indigo-600 text-white shadow-md")}>
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

        {/* Tab Content: Supply (Compact) */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/20 text-[9px] font-black uppercase text-slate-400 tracking-widest">TODAY_INVENTORY</div>
                <table className="w-full text-left">
                   <tbody className="divide-y divide-slate-50">
                      {paperSupply.map((p) => (
                         <tr key={p.name} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-black text-slate-800 text-xs italic uppercase">{p.name}</td>
                            <td className="px-6 py-4 font-black text-slate-400 text-[10px]">Supply: <span className="text-slate-800">{p.quantity}</span></td>
                            <td className={cn("px-6 py-4 font-black text-[10px]", p.adjustment < 0 ? "text-red-500" : "text-slate-300")}>Adj: {p.adjustment}</td>
                            <td className="px-6 py-4 text-right font-black text-indigo-600 text-sm italic tracking-tighter">FINAL: {p.final}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Tab Content: Earnings (Compact) */}
        {activeTab === 'EARNINGS' && (
          <div className="animate-in fade-in zoom-in duration-300 space-y-6">
             <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl flex justify-between items-center overflow-hidden relative">
                <div className="relative z-10">
                   <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">NET_TODAY_COMMISSION</p>
                   <p className="text-4xl font-black italic tracking-tighter">₹{totalEarnings.toFixed(2)}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl relative z-10"><TrendingUp size={24} /></div>
                <DollarSign className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
             </div>
             
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {paperSupply.map((p) => (
                   <div key={p.name} className="p-5 border-b border-slate-50 flex justify-between items-center hover:bg-slate-50">
                      <div>
                         <p className="text-[10px] font-black text-slate-800 uppercase italic">{p.name}</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.final} Copies @ ₹{p.commission}/copy</p>
                      </div>
                      <p className="text-sm font-black text-slate-900 italic">₹{(p.final * p.commission).toFixed(2)}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* Tab Content: Attendance (New Professional Timeline) */}
        {activeTab === 'ATTENDANCE' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/20 text-[9px] font-black uppercase text-slate-400 tracking-widest flex justify-between">
                   <span>ATTENDANCE_LOG_TIMELINE</span>
                   <span className="text-emerald-600">80% MONTHLY_RATIO</span>
                </div>
                <div className="divide-y divide-slate-50">
                   {attendanceLogs.map((log) => (
                      <div key={log.date} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-all">
                         <div className="flex items-center gap-6">
                            <div className={cn("w-2 h-2 rounded-full shadow-sm", log.status === 'PRESENT' ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
                            <div>
                               <p className="text-[11px] font-black text-slate-900 uppercase italic tracking-tight">{log.date}</p>
                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{log.loc}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <div className="text-right hidden sm:block">
                               <p className="text-[9px] font-black text-slate-800 tracking-tighter uppercase">{log.time === '-' ? 'ABSENT_NOTICE' : `CHECK_IN: ${log.time}`}</p>
                               <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">VERIFIED_VIA_GPS</p>
                            </div>
                            <div className={cn("px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm", log.status === 'PRESENT' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100")}>
                               {log.status}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
                <div className="p-6 bg-slate-50/50 text-center border-t border-slate-50">
                   <button className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-200">VIEW_FULL_MONTHLY_REPORT</button>
                </div>
             </div>
          </div>
        )}

      </main>

      {/* Flexible Billing Modal (Keep compact) */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-sm w-full rounded-[2rem] p-8 shadow-2xl relative animate-scale-in flex flex-col max-h-[85vh] overflow-hidden">
             <button onClick={() => setSelectedReceipt(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors z-20"><X size={20} /></button>
             <div className="overflow-y-auto pr-2 scrollbar-hide flex-1">
                <div className="text-center mb-6 border-b border-dashed pb-4">
                   <h2 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">BILLING_TERMINAL</h2>
                </div>
                <div className="mb-6">
                   <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                     <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all", payMode === 'CASH' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>CASH</button>
                     <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all", payMode === 'ONLINE' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>ONLINE</button>
                   </div>
                   {payMode === 'ONLINE' && (
                      <div className="animate-in fade-in zoom-in duration-300 mb-6 flex flex-col items-center">
                         <div className="bg-slate-50 w-36 h-36 rounded-2xl border-2 border-white shadow-lg flex items-center justify-center"><QrCode size={80} className="text-slate-800" /></div>
                      </div>
                   )}
                   <div className="bg-slate-900 p-6 rounded-2xl text-center shadow-xl">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">MANUAL_ENTRY</p>
                      <div className="flex items-center justify-center gap-2">
                         <span className="text-2xl font-black text-indigo-500 italic">₹</span>
                         <input type="number" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value)} className="bg-transparent text-2xl font-black text-white italic outline-none w-24 tracking-tighter" />
                      </div>
                   </div>
                </div>
             </div>
             <button onClick={() => { setDeliveries(prev => prev.map(d => d.id === selectedReceipt.id ? {...d, payment_status: 'PAID'} : d)); setSelectedReceipt(null); }} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-2xl">CONFIRM_&_SUBMIT</button>
          </div>
        </div>
      )}
    </div>
  );
}
