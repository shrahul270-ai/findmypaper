"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award, BookOpen, Layers, BarChart3
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [activeTab, setActiveTab] = useState<'DELIVERIES' | 'SUPPLY' | 'EARNINGS' | 'ATTENDANCE'>('DELIVERIES');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOnline, setSelectedOnline] = useState<any>(null);
  const [editableAmount, setEditableAmount] = useState<string>('');
  
  const todayDate = "05 May 2026";

  // Detailed Inventory Data
  const inventorySupply = [
    { type: 'PAPER', name: 'Dainik Bhaskar', qty: 45, agentPrice: 3.50, custPrice: 5.00, margin: 1.50 },
    { type: 'PAPER', name: 'Times of India', qty: 30, agentPrice: 4.00, custPrice: 6.00, margin: 2.00 },
    { type: 'MAGAZINE', name: 'India Today', qty: 12, agentPrice: 25.00, custPrice: 35.00, margin: 10.00 },
    { type: 'BOOK', name: 'NCRT Textbook', qty: 5, agentPrice: 180.00, custPrice: 220.00, margin: 40.00 },
    { type: 'PAPER', name: 'Amar Ujala', qty: 25, agentPrice: 3.25, custPrice: 4.50, margin: 1.25 },
  ];

  // Calculations
  const totalQty = inventorySupply.reduce((acc, curr) => acc + curr.qty, 0);
  const totalAgentCost = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.agentPrice), 0);
  const totalCustPrice = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.custPrice), 0);
  const totalMarginToday = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.margin), 0);
  const grandTotalEarnings = 15420.50 + totalMarginToday;

  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '9876543210', address: 'Flat 402, Green Valley', status: 'DELIVERED', amount: 450, payment_status: 'PAID', mode: 'CASH' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '9988776655', address: 'B-12, Rose Villa', status: 'PENDING', amount: 320, payment_status: 'PENDING', mode: null },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '9122334455', address: 'Shop No. 5, Market', status: 'DELIVERED', amount: 1200, payment_status: 'PAID', mode: 'CASH' },
    { id: 'C107', name: 'Priya Singh', paper: 'TOI', phone: '9555666777', address: 'H.No 124, Gali 3', status: 'PENDING', amount: 500, payment_status: 'PENDING', mode: null },
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-x-auto scrollbar-hide">
           {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE'].map((tab) => (
             <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}>
               {tab === 'SUPPLY' ? 'INVENTORY' : tab}
             </button>
           ))}
        </div>

        {/* Deliveries Section */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1 italic">DATE: {todayDate}</p>
                  <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">DELIVERY_TERMINAL</h1>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                   <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="SEARCH CUSTOMER..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase shadow-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                   </div>
                   <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">SUBMIT_CASH</button>
                </div>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-6 py-4">CUSTOMER_DATA</th>
                      <th className="px-6 py-4">BILL</th>
                      <th className="px-6 py-4 text-right">PAYMENT_OPTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deliveries.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4 flex items-center gap-4">
                           <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-black italic">F</div>
                           <div>
                              <p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase italic">{item.name}</p>
                              <p className="text-[8px] text-indigo-600 font-black uppercase tracking-widest">{item.paper}</p>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-black text-slate-900 text-sm italic">₹{item.amount}</td>
                        <td className="px-6 py-4 text-right">
                           {item.payment_status === 'PENDING' ? (
                             <div className="flex justify-end gap-2">
                                <button onClick={() => handleQuickPay(item.id, 'CASH')} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-md">CASH</button>
                                <button onClick={() => handleQuickPay(item.id, 'ONLINE')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-md">ONLINE</button>
                             </div>
                           ) : (
                             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 size={12} /> PAID_{item.mode}</span>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Inventory Section (Restored Detailed Version) */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-6">
                <p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">INVENTORY_SUPPLY</h1>
             </header>
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-6 py-4">ITEM_NAME</th>
                      <th className="px-6 py-4">QTY</th>
                      <th className="px-6 py-4 text-indigo-600">AGENT_CP</th>
                      <th className="px-6 py-4 text-emerald-600">CUST_SP</th>
                      <th className="px-6 py-4 text-right">NET_MARGIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {inventorySupply.map((p) => (
                      <tr key={p.name} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-black text-slate-800 text-xs italic uppercase">{p.name}</td>
                        <td className="px-6 py-4 font-black text-slate-500 text-[10px]">{p.qty}</td>
                        <td className="px-6 py-4 font-black text-indigo-600 text-xs italic">₹{p.agentPrice}</td>
                        <td className="px-6 py-4 font-black text-emerald-600 text-xs italic">₹{p.custPrice}</td>
                        <td className="px-6 py-4 text-right font-black text-slate-900 text-sm italic">₹{(p.qty * p.margin).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 text-white">
                     <tr className="font-black italic uppercase tracking-tighter">
                        <td className="px-6 py-5 text-sm">GRAND_TOTAL</td>
                        <td className="px-6 py-5 text-[10px] text-slate-400">{totalQty}</td>
                        <td className="px-6 py-5 text-indigo-400">₹{totalAgentCost.toFixed(2)}</td>
                        <td className="px-6 py-5 text-emerald-400">₹{totalCustPrice.toFixed(2)}</td>
                        <td className="px-6 py-5 text-right text-lg text-emerald-400">₹{totalMarginToday.toFixed(2)}</td>
                     </tr>
                  </tfoot>
                </table>
             </div>
          </div>
        )}

        {/* Earnings Section (Restored Detailed Version) */}
        {activeTab === 'EARNINGS' && (
           <div className="animate-in fade-in zoom-in duration-300 space-y-6">
              <header className="mb-2"><p className="text-indigo-600 text-[10px] font-black uppercase mb-1 italic">DATE: {todayDate}</p><h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">FINANCIAL_REPORT</h1></header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Clock size={12} /> TODAY_NET_EARNING</p>
                    <p className="text-4xl font-black italic tracking-tighter text-slate-900">₹{totalMarginToday.toFixed(2)}</p>
                 </div>
                 <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2"><TrendingUp size={12} /> RUNNING_MONTHLY_TOTAL</p>
                    <p className="text-4xl font-black italic tracking-tighter text-emerald-400">₹{grandTotalEarnings.toFixed(2)}</p>
                    <BarChart3 className="absolute -right-6 -bottom-6 w-24 h-24 opacity-10" />
                 </div>
              </div>
           </div>
        )}

        {/* Attendance Section (Restored & Updated Status) */}
        {activeTab === 'ATTENDANCE' && (
           <div className="animate-in fade-in zoom-in duration-300 min-h-[300px] flex items-center justify-center bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="text-center">
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100"><CheckCircle2 size={32} /></div>
                 <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">PRESENT_LOGGED</h3>
                 <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1 border-b border-emerald-100 pb-1 inline-block">VERIFIED_BY_AGENT</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">{todayDate} | 05:30 AM</p>
              </div>
           </div>
        )}
      </main>

      {/* Online Scanner Modal Restored */}
      {selectedOnline && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-sm w-full rounded-[2rem] p-8 shadow-2xl relative animate-scale-in flex flex-col max-h-[85vh] overflow-hidden text-center">
             <button onClick={() => setSelectedOnline(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X size={20} /></button>
             <div className="mb-6 border-b border-dashed pb-4">
                <h2 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">ONLINE_TERMINAL</h2>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">{selectedOnline.name}</p>
             </div>
             <div className="animate-in fade-in zoom-in duration-500 mb-6 flex flex-col items-center">
                <div className="bg-slate-50 w-44 h-44 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center"><QrCode size={100} className="text-slate-800" /></div>
                <p className="mt-4 text-[9px] font-black text-indigo-600 uppercase tracking-widest">SCAN_AGENT_QR</p>
             </div>
             <div className="bg-slate-900 p-6 rounded-2xl mb-6 text-center shadow-xl">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">VERIFY_AMOUNT</p>
                <div className="flex items-center justify-center gap-2">
                   <span className="text-2xl font-black text-indigo-500 italic">₹</span>
                   <input type="number" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value)} className="bg-transparent text-2xl font-black text-white italic outline-none w-24 tracking-tighter" />
                </div>
             </div>
             <button onClick={() => { setDeliveries(prev => prev.map(d => d.id === selectedOnline.id ? {...d, payment_status: 'PAID', mode: 'ONLINE'} : d)); setSelectedOnline(null); }} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-2xl">CONFIRM_PAYMENT</button>
          </div>
        </div>
      )}
    </div>
  );
}
