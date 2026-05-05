"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award, BookOpen, Layers, BarChart3, Activity, PhoneCall
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
  const [activeTab, setActiveTab] = useState<'DELIVERIES' | 'SUPPLY' | 'EARNINGS' | 'ATTENDANCE'>('DELIVERIES');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOnline, setSelectedOnline] = useState<any>(null);
  const [editableAmount, setEditableAmount] = useState<string>('');
  
  const todayDate = "05 May 2026";

  // Data
  const inventorySupply = [
    { type: 'PAPER', name: 'Dainik Bhaskar', qty: 45, agentPrice: 3.50, custPrice: 5.00, margin: 1.50 },
    { type: 'PAPER', name: 'Times of India', qty: 30, agentPrice: 4.00, custPrice: 6.00, margin: 2.00 },
    { type: 'MAGAZINE', name: 'India Today', qty: 12, agentPrice: 25.00, custPrice: 35.00, margin: 10.00 },
    { type: 'BOOK', name: 'NCRT Textbook', qty: 5, agentPrice: 180.00, custPrice: 220.00, margin: 40.00 },
    { type: 'PAPER', name: 'Amar Ujala', qty: 25, agentPrice: 3.25, custPrice: 4.50, margin: 1.25 },
  ];

  const totalMarginToday = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.margin), 0);
  const grandTotalEarnings = 15420.50 + totalMarginToday;

  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '+91 98765 43210', address: 'Flat 402, Green Valley', status: 'DELIVERED', amount: 450, payment_status: 'PAID', mode: 'CASH' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '+91 99887 76655', address: 'B-12, Rose Villa', status: 'PENDING', amount: 320, payment_status: 'PENDING', mode: null },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '+91 91223 34455', address: 'Shop No. 5, Market', status: 'DELIVERED', amount: 1200, payment_status: 'PAID', mode: 'CASH' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '+91 95556 66777', address: 'H.No 124, Gali 3', status: 'PENDING', amount: 500, payment_status: 'PENDING', mode: null },
  ]);

  // Attendance Calendar Logic (Simplified for May 2026)
  const attendanceDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    status: (i + 1) <= 5 ? 'PRESENT' : 'FUTURE', // May 1 to May 5 marked present
  }));

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
      const finalAmt = parseFloat(editableAmount) || 0;
      setDeliveries(prev => prev.map(d => d.id === selectedOnline.id ? { ...d, payment_status: 'PAID', mode: 'ONLINE', amount: finalAmt } : d));
      setSelectedOnline(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-8 overflow-x-auto scrollbar-hide max-w-2xl">
           {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE'].map((tab) => (
             <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}>
               {tab === 'SUPPLY' ? 'INVENTORY' : tab}
             </button>
           ))}
        </div>

        {/* Deliveries Tab with Mobile Number */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p>
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">DELIVERY_TERMINAL</h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <div className="relative flex-1 md:w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="SEARCH CUSTOMER..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none" />
                   </div>
                   <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2"><Wallet size={16} /> SUBMIT_CASH</button>
                </div>
             </header>

             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-8 py-5">CUSTOMER_&_MOBILE</th>
                      <th className="px-8 py-5">BILL_AMOUNT</th>
                      <th className="px-8 py-5 text-right">QUICK_ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deliveries.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                        <td className="px-8 py-6 flex items-center gap-4">
                           <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black italic group-hover:bg-indigo-600 group-hover:text-white transition-all"><User size={20} /></div>
                           <div>
                              <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1 italic">{item.paper}</p>
                              <p className="text-[9px] font-black text-slate-400 flex items-center gap-1"><PhoneCall size={10} className="text-emerald-500" /> {item.phone}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6 font-black text-slate-900 text-lg italic">₹{item.amount}</td>
                        <td className="px-8 py-6 text-right">
                           {item.payment_status === 'PENDING' ? (
                             <div className="flex justify-end gap-3">
                                <button onClick={() => handleQuickPay(item.id, 'CASH')} className="bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">CASH</button>
                                <button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">ONLINE</button>
                             </div>
                           ) : (
                             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100"><CheckCircle2 size={14} /> PAID_VIA_{item.mode}</span>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-10 flex justify-between items-center">
                <div><p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p><h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">INVENTORY_SUPPLY</h1></div>
             </header>
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead><tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20"><th className="px-8 py-5">ITEM_NAME</th><th className="px-8 py-5 text-indigo-600">AGENT_COST</th><th className="px-8 py-5 text-emerald-600">CUST_SP</th><th className="px-8 py-5 text-right">MARGIN</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">{inventorySupply.map((p) => (<tr key={p.name} className="hover:bg-slate-50 transition-all"><td className="px-8 py-6 font-black text-slate-800 text-sm italic uppercase tracking-tight">{p.name} <span className="text-[9px] text-slate-400 ml-2">(QTY: {p.qty})</span></td><td className="px-8 py-6 font-black text-indigo-600 text-xs italic">₹{p.agentPrice}</td><td className="px-8 py-6 font-black text-emerald-600 text-xs italic">₹{p.custPrice}</td><td className="px-8 py-6 text-right font-black text-slate-900 text-lg italic tracking-tighter">₹{(p.qty * p.margin).toFixed(2)}</td></tr>))}</tbody>
                  <tfoot className="bg-slate-900 text-white"><tr className="font-black italic uppercase tracking-tighter"><td className="px-8 py-6 text-base">GRAND_TOTAL</td><td className="px-8 py-6 text-indigo-400 italic">₹{inventorySupply.reduce((a,b) => a+(b.qty*b.agentPrice), 0).toFixed(2)}</td><td className="px-8 py-6 text-emerald-400 italic">₹{inventorySupply.reduce((a,b) => a+(b.qty*b.custPrice), 0).toFixed(2)}</td><td className="px-8 py-6 text-right text-2xl text-emerald-400 italic">₹{totalMarginToday.toFixed(2)}</td></tr></tfoot>
                </table>
             </div>
          </div>
        )}

        {/* Earnings Tab with Graphs */}
        {activeTab === 'EARNINGS' && (
           <div className="animate-in fade-in zoom-in duration-300 space-y-8">
              <header className="mb-2"><p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p><h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">FINANCIAL_ANALYTICS</h1></header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group flex justify-between items-start">
                    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Clock size={14} /> TODAY_NET_PROFIT</p><p className="text-5xl font-black italic tracking-tighter text-slate-900">₹{totalMarginToday.toFixed(2)}</p><div className="mt-8 flex items-center gap-3"><div className="w-10 h-1 bg-emerald-500 rounded-full"></div><p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">+12% vs YESTERDAY</p></div></div>
                    <MiniBarChart />
                 </div>
                 <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex justify-between items-start">
                    <div><p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><TrendingUp size={14} /> MONTHLY_RUNNING_TOTAL</p><p className="text-5xl font-black italic tracking-tighter text-emerald-400">₹{grandTotalEarnings.toFixed(2)}</p><div className="mt-8 flex items-center gap-3"><div className="w-10 h-1 bg-indigo-500 rounded-full"></div><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">ON_TRACK</p></div></div>
                    <MiniBarChart />
                 </div>
              </div>
           </div>
        )}

        {/* Attendance Tab with Calendar Grid */}
        {activeTab === 'ATTENDANCE' && (
           <div className="animate-in fade-in zoom-in duration-300 space-y-8">
              <header className="mb-2">
                 <p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic flex items-center gap-2"><Calendar size={12} /> DATE: {todayDate}</p>
                 <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none mb-1">ATTENDANCE_TERMINAL</h1>
                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={14} /> VERIFIED_BY_AGENT</p>
              </header>

              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-8 md:p-12 overflow-hidden">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">MAY 2026_CALENDAR</h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PRESENT</span></div>
                       <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">FUTURE</span></div>
                    </div>
                 </div>
                 
                 {/* Calendar Grid: 7 columns for days */}
                 <div className="grid grid-cols-7 gap-3 md:gap-6">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="text-center text-[9px] font-black text-indigo-600 tracking-widest mb-4">{day}</div>
                    ))}
                    {attendanceDays.map((day) => (
                      <div key={day.day} className={cn(
                        "aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all group relative overflow-hidden",
                        day.status === 'PRESENT' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-50 text-slate-300"
                      )}>
                         <span className="text-sm font-black italic">{day.day}</span>
                         {day.status === 'PRESENT' && <CheckCircle2 size={12} className="mt-1" />}
                         {day.day === 5 && <div className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-bl-lg"></div>}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        )}
      </main>

      {/* Online Scanner Modal */}
      {selectedOnline && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-sm w-full rounded-[3rem] p-8 md:p-10 shadow-2xl relative animate-scale-in flex flex-col max-h-[90vh] overflow-hidden text-center text-slate-900">
             <button onClick={() => setSelectedOnline(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-20"><X size={24} /></button>
             <div className="overflow-y-auto pr-2 scrollbar-hide flex-1">
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
             </div>
             <div className="pt-4 pb-4"><button onClick={confirmOnlinePayment} className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"><ShieldCheck size={18} /> CONFIRM_ONLINE_PAYMENT</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
