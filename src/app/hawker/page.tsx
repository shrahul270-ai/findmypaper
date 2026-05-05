"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3, Newspaper, TrendingUp, AlertCircle, Award, BookOpen, Layers
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

  const todayDate = "05 May 2026";

  // Detailed Inventory Data with 3-Way Pricing
  const inventorySupply = [
    { type: 'PAPER', name: 'Dainik Bhaskar', qty: 45, agentPrice: 3.50, custPrice: 5.00, margin: 1.50 },
    { type: 'PAPER', name: 'Times of India', qty: 30, agentPrice: 4.00, custPrice: 6.00, margin: 2.00 },
    { type: 'MAGAZINE', name: 'India Today', qty: 12, agentPrice: 25.00, custPrice: 35.00, margin: 10.00 },
    { type: 'BOOK', name: 'NCRT Textbook', qty: 5, agentPrice: 180.00, custPrice: 220.00, margin: 40.00 },
    { type: 'PAPER', name: 'Amar Ujala', qty: 25, agentPrice: 3.25, custPrice: 4.50, margin: 1.25 },
  ];

  const totalMargin = inventorySupply.reduce((acc, curr) => acc + (curr.qty * curr.margin), 0);

  const deliveries = [
    { id: 'C104', name: 'Anil Mehta', paper: 'TOI + Bhaskar', phone: '9876543210', address: 'Flat 402, Green Valley', status: 'DELIVERED', amount: 450, payment_status: 'PAID' },
    { id: 'C105', name: 'Suresh Kumar', paper: 'Amar Ujala', phone: '9988776655', address: 'B-12, Rose Villa', status: 'PENDING', amount: 320, payment_status: 'PENDING' },
    { id: 'C106', name: 'Daily Store', paper: '10x Bhaskar', phone: '9122334455', address: 'Shop No. 5, Market', status: 'DELIVERED', amount: 1200, payment_status: 'PAID' },
  ];

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
               {tab}
             </button>
           ))}
        </div>

        {/* Tab Content: Deliveries */}
        {activeTab === 'DELIVERIES' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                  <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">DELIVERY_TERMINAL</h1>
                </div>
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="SEARCH CUSTOMER..." className="pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-[8px] font-black uppercase outline-none w-48 shadow-sm" />
                </div>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                      <th className="px-6 py-4">CUSTOMER_DATA</th>
                      <th className="px-6 py-4">ADDRESS</th>
                      <th className="px-6 py-4">BILL</th>
                      <th className="px-6 py-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deliveries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-all">
                        <td className="px-6 py-4">
                           <p className="font-black text-slate-800 text-xs leading-none mb-1 uppercase italic">{item.name}</p>
                           <p className="text-[8px] text-indigo-600 font-black uppercase tracking-widest">{item.paper}</p>
                        </td>
                        <td className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase italic">{item.address}</td>
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

        {/* Tab Content: Inventory Supply (Detailed Pricing) */}
        {activeTab === 'SUPPLY' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-8">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">INVENTORY_SUPPLY_PRICING</h1>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/20 text-[9px] font-black uppercase text-slate-400 tracking-widest">STOCK_&_PRICE_BREAKDOWN</div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-50 text-[8px] uppercase font-black tracking-widest text-slate-400">
                           <th className="px-6 py-4 text-center">TYPE</th>
                           <th className="px-6 py-4">ITEM_NAME</th>
                           <th className="px-6 py-4">QTY</th>
                           <th className="px-6 py-4 text-indigo-600 bg-indigo-50/30">AGENT_COST</th>
                           <th className="px-6 py-4 text-emerald-600 bg-emerald-50/30">CUST_PRICE</th>
                           <th className="px-6 py-4 text-right">NET_MARGIN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {inventorySupply.map((item) => (
                            <tr key={item.name} className="hover:bg-slate-50 transition-all">
                               <td className="px-6 py-4 text-center">
                                  {item.type === 'PAPER' ? <Newspaper size={14} className="text-slate-300 mx-auto" /> : item.type === 'BOOK' ? <BookOpen size={14} className="text-slate-300 mx-auto" /> : <Layers size={14} className="text-slate-300 mx-auto" />}
                               </td>
                               <td className="px-6 py-4 font-black text-slate-800 text-xs italic uppercase tracking-tight">{item.name}</td>
                               <td className="px-6 py-4 font-black text-slate-500 text-[10px]">{item.qty}</td>
                               <td className="px-6 py-4 font-black text-indigo-600 bg-indigo-50/20 text-xs italic">₹{item.agentPrice}</td>
                               <td className="px-6 py-4 font-black text-emerald-600 bg-emerald-50/20 text-xs italic">₹{item.custPrice}</td>
                               <td className="px-6 py-4 text-right font-black text-slate-900 text-sm italic">₹{(item.qty * item.margin).toFixed(2)}</td>
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
          <div className="animate-in fade-in zoom-in duration-300 space-y-6">
             <header className="mb-2">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">EARNING_REPORT</h1>
             </header>

             <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">TOTAL_NET_MARGIN_TODAY</p>
                   <p className="text-5xl font-black italic tracking-tighter text-emerald-400">₹{totalMargin.toFixed(2)}</p>
                   <p className="text-[8px] font-black text-slate-500 mt-2 uppercase tracking-widest italic">Calculated based on Customer SP - Agent CP</p>
                </div>
                <div className="bg-emerald-500 p-4 rounded-2xl relative z-10 shadow-lg shadow-emerald-500/20">
                   <TrendingUp size={32} className="text-white" />
                </div>
                <Award className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
             </div>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">TOTAL_AGENT_PAYOUT</p>
                      <p className="text-xl font-black text-indigo-600 italic">₹{inventorySupply.reduce((a,b) => a + (b.qty * b.agentPrice), 0).toFixed(2)}</p>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">TOTAL_CUSTOMER_BILLING</p>
                      <p className="text-xl font-black text-emerald-600 italic">₹{inventorySupply.reduce((a,b) => a + (b.qty * b.custPrice), 0).toFixed(2)}</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Tab Content: Attendance */}
        {activeTab === 'ATTENDANCE' && (
          <div className="animate-in fade-in zoom-in duration-300">
             <header className="mb-8">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DATE: {todayDate}</p>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">ATTENDANCE_LOG</h1>
             </header>

             <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                   <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                      <CheckCircle2 size={32} />
                   </div>
                   <p className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">PRESENT_LOGGED</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Check-in: 05:30 AM | Verified via GPS</p>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
