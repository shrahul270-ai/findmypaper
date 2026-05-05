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
  
  const todayDate = "05 May 2026";

  // Detailed Inventory Data
  const inventorySupply = [
    { type: 'PAPER', name: 'Dainik Bhaskar', qty: 45, agentPrice: 3.50, custPrice: 5.00, margin: 1.50 },
    { type: 'PAPER', name: 'Times of India', qty: 30, agentPrice: 4.00, custPrice: 6.00, margin: 2.00 },
    { type: 'MAGAZINE', name: 'India Today', qty: 12, agentPrice: 25.00, custPrice: 35.00, margin: 10.00 },
    { type: 'BOOK', name: 'NCRT Textbook', qty: 5, agentPrice: 180.00, custPrice: 220.00, margin: 40.00 },
    { type: 'PAPER', name: 'Amar Ujala', qty: 25, agentPrice: 3.25, custPrice: 4.50, margin: 1.25 },
  ];

  // Calculations for Today
  const totalQty = inventorySupply.reduce((acc, curr) => acc + curr.qty, 0);
  const totalAgentCost = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.agentPrice), 0);
  const totalCustPrice = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.custPrice), 0);
  const totalMarginToday = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.margin), 0);

  // Cumulative Total (Simulated for May month till date)
  const previousDaysTotal = 15420.50; // Example cumulative from May 1 to May 4
  const grandTotalEarnings = previousDaysTotal + totalMarginToday;

  const deliveries = [
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '9876543210', address: 'Flat 402, Green Valley', status: 'DELIVERED', amount: 450, payment_status: 'PAID' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '9988776655', address: 'B-12, Rose Villa', status: 'PENDING', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '9122334455', address: 'Shop No. 5, Market', status: 'DELIVERED', amount: 1200, payment_status: 'PAID' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Compact Navigation */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-x-auto scrollbar-hide">
           {['DELIVERIES', 'SUPPLY', 'EARNINGS', 'ATTENDANCE'].map((tab) => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={cn("px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === tab ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
             >
               {tab === 'SUPPLY' ? 'INVENTORY' : tab}
             </button>
           ))}
        </div>

        {/* Tab Content: Deliveries */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                  <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">DELIVERY_TERMINAL</h1>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-50">SUBMIT_CASH</button>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-6 py-4">CUSTOMER_DATA</th>
                      <th className="px-6 py-4">BILL</th>
                      <th className="px-6 py-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deliveries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4 flex items-center gap-4">
                           <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><User size={16} /></div>
                           <div>
                              <p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase italic">{item.name}</p>
                              <p className="text-[8px] text-indigo-600 font-black uppercase tracking-widest">{item.paper}</p>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-black text-slate-900 text-sm italic">₹{item.amount}</td>
                        <td className="px-6 py-4 text-right">
                           <button className={cn("px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest", item.payment_status === 'PAID' ? "text-emerald-500 bg-emerald-50" : "bg-indigo-600 text-white")}>
                              {item.payment_status}
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Tab Content: Inventory Supply with Cumulative Footer */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-6">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">INVENTORY_BREAKDOWN</h1>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                           <th className="px-6 py-4">ITEM_NAME</th>
                           <th className="px-6 py-4">QTY</th>
                           <th className="px-6 py-4">AGENT_CP</th>
                           <th className="px-6 py-4">CUST_SP</th>
                           <th className="px-6 py-4 text-right">NET_MARGIN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {inventorySupply.map((item) => (
                            <tr key={item.name} className="hover:bg-slate-50 transition-all">
                               <td className="px-6 py-4">
                                  <p className="font-black text-slate-800 text-xs italic uppercase">{item.name}</p>
                                  <p className="text-[7px] text-slate-400 font-black uppercase">{item.type}</p>
                               </td>
                               <td className="px-6 py-4 font-black text-slate-500 text-[10px]">{item.qty}</td>
                               <td className="px-6 py-4 font-black text-indigo-600 text-xs italic">₹{item.agentPrice}</td>
                               <td className="px-6 py-4 font-black text-emerald-600 text-xs italic">₹{item.custPrice}</td>
                               <td className="px-6 py-4 text-right font-black text-slate-900 text-sm italic">₹{(item.qty * item.margin).toFixed(2)}</td>
                            </tr>
                         ))}
                      </tbody>
                      {/* Grand Total Footer */}
                      <tfoot className="bg-slate-900 text-white">
                         <tr className="font-black italic uppercase tracking-tighter">
                            <td className="px-6 py-5 text-sm">TODAY_GRAND_TOTAL</td>
                            <td className="px-6 py-5 text-[10px] text-slate-400">{totalQty}</td>
                            <td className="px-6 py-5 text-indigo-400">₹{totalAgentCost.toFixed(2)}</td>
                            <td className="px-6 py-5 text-emerald-400">₹{totalCustPrice.toFixed(2)}</td>
                            <td className="px-6 py-5 text-right text-lg text-emerald-400">₹{totalMarginToday.toFixed(2)}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Earnings with Daily Cumulative Total */}
        {activeTab === 'EARNINGS' && (
          <div className="animate-in fade-in zoom-in duration-300 space-y-6">
             <header className="mb-2">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">FINANCIAL_REPORT</h1>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Today's Total */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-600 transition-all">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Clock size={12} /> TODAY_NET_EARNING</p>
                   <p className="text-4xl font-black italic tracking-tighter text-slate-900">₹{totalMarginToday.toFixed(2)}</p>
                   <div className="mt-4 flex items-center gap-2">
                      <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase italic">Successfully Calculated</span>
                   </div>
                </div>

                {/* Cumulative Period Total */}
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                   <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2"><TrendingUp size={12} /> MONTHLY_RUNNING_TOTAL</p>
                   <p className="text-4xl font-black italic tracking-tighter text-emerald-400">₹{grandTotalEarnings.toFixed(2)}</p>
                   <p className="text-[7px] font-black text-slate-500 mt-4 uppercase tracking-[0.2em] italic">Updated Daily: May 01 - May 05</p>
                   <BarChart3 className="absolute -right-6 -bottom-6 w-24 h-24 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                </div>
             </div>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">DAILY_PROGRESSION_SUMMARY</p>
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-indigo-50 transition-colors">
                      <span className="text-[10px] font-black text-slate-600 uppercase italic">04 May 2026 Earnings</span>
                      <span className="text-sm font-black text-slate-900 italic">₹3,840.00</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-indigo-50 transition-colors">
                      <span className="text-[10px] font-black text-slate-600 uppercase italic">03 May 2026 Earnings</span>
                      <span className="text-sm font-black text-slate-900 italic">₹4,120.50</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
                      <span className="text-[10px] font-black uppercase italic tracking-widest">Total Monthly Progression</span>
                      <span className="text-sm font-black italic">₹{grandTotalEarnings.toFixed(2)}</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Attendance (Stay Compact) */}
        {activeTab === 'ATTENDANCE' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-10 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100"><CheckCircle2 size={32} /></div>
                <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">PRESENT_&_VERIFIED</h3>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{todayDate} | Depot 4 | 05:30 AM</p>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
