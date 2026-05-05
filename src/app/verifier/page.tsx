"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, Download, ChevronDown, User, 
  Building2, Bike, Newspaper, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, ArrowDownLeft, MoreVertical,
  Mail, Hash, Calendar, DollarSign, Wallet, AlertCircle, X, PhoneCall, RefreshCw,
  Image as ImageIcon, Eye, ShieldCheck, Settings2, Share2
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Customizable Columns State
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    email: false,
    phone: true,
    addedBy: true,
    paper: true,
    amount: true,
    utr: true,
    time: false,
  });

  const [transactions, setTransactions] = useState([
    { id: '5101', name: 'Amit Verma', email: 'amit@findmypaper.com', phone: '9876543210', addedBy: 'Ramesh (H)', paper: 'Dainik Bhaskar', amount: 450, utr: 'UTR123', status: 'PENDING', proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', time: '11:23 PM' },
    { id: '2182', name: 'Priya Dhar', email: 'priya@findmypaper.com', phone: '9988776655', addedBy: 'Amit (A)', paper: 'TOI', amount: 320, utr: '-', status: 'PENDING', proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', time: '11:16 PM' },
    { id: '9756', name: 'Suresh Kumar', email: 'suresh@findmypaper.com', phone: '9555666777', addedBy: 'Rahul (H)', paper: 'Amar Ujala', amount: 500, utr: 'UTR456', status: 'PAID', proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', time: '10:05 PM' }
  ]);

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col as keyof typeof prev] }));
  };

  const handleWhatsAppShare = () => {
    let message = `*DAILY_AUDIT_REPORT*\n\n`;
    transactions.filter(t => t.status === 'PAID').forEach(tx => {
      message += `👤 *${tx.name}*\n`;
      if (visibleColumns.phone) message += `📞 ${tx.phone}\n`;
      if (visibleColumns.paper) message += `🗞️ ${tx.paper}\n`;
      if (visibleColumns.amount) message += `💰 ₹${tx.amount}\n`;
      if (visibleColumns.utr) message += `🔢 UTR: ${tx.utr}\n`;
      message += `------------------\n`;
    });
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const filteredTransactions = transactions.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.phone.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Professional Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Audit Terminal v9.5</p>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">VERIFIER_CONSOLE</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 text-slate-900">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search audits..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
            <button onClick={handleWhatsAppShare} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
              <Share2 size={16} /> DISPATCH
            </button>
          </div>
        </header>

        {/* Action Controls & Column Manager */}
        <div className="flex justify-between items-center mb-6 px-2">
           <div className="flex items-center gap-3">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest italic underline decoration-indigo-500 underline-offset-4">Transaction Queue</h2>
           </div>
           <div className="relative">
              <button 
                onClick={() => setShowColumnSettings(!showColumnSettings)}
                className={cn("p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", showColumnSettings ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600")}
              >
                 <Settings2 size={14} /> Column_Settings
              </button>
              
              {showColumnSettings && (
                 <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-[100] animate-in slide-in-from-top-2 duration-200">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b pb-2">Toggle Display Columns</p>
                    <div className="space-y-2">
                       {Object.keys(visibleColumns).map(col => (
                          <label key={col} className="flex items-center gap-3 cursor-pointer group">
                             <input 
                              type="checkbox" 
                              checked={visibleColumns[col as keyof typeof visibleColumns]} 
                              onChange={() => toggleColumn(col)}
                              className="w-4 h-4 rounded-md border-slate-200 text-indigo-600 focus:ring-indigo-500"
                             />
                             <span className="text-[10px] font-bold text-slate-600 uppercase group-hover:text-indigo-600 transition-colors">{col}</span>
                          </label>
                       ))}
                    </div>
                 </div>
              )}
           </div>
        </div>

        {/* Clean Professional Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <th className="px-8 py-5">Customer Profile</th>
                       {visibleColumns.id && <th className="px-6 py-5">User_ID</th>}
                       {visibleColumns.phone && <th className="px-6 py-5">Mobile</th>}
                       {visibleColumns.addedBy && <th className="px-6 py-5">Added_By</th>}
                       {visibleColumns.paper && <th className="px-6 py-5">Paper/Items</th>}
                       {visibleColumns.amount && <th className="px-6 py-5 text-right">Amount</th>}
                       {visibleColumns.utr && <th className="px-6 py-5">UTR_ID</th>}
                       <th className="px-8 py-5 text-right">Audit_Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredTransactions.map((tx) => (
                       <tr key={tx.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-8 py-6">
                             <p className="font-bold text-slate-900 text-sm italic">{tx.name}</p>
                             {visibleColumns.email && <p className="text-[10px] text-slate-400 font-medium">{tx.email}</p>}
                          </td>
                          {visibleColumns.id && <td className="px-6 py-6 text-xs font-bold text-slate-300">#{tx.id}</td>}
                          {visibleColumns.phone && <td className="px-6 py-6 text-[10px] font-black text-indigo-600 italic">{tx.phone}</td>}
                          {visibleColumns.addedBy && <td className="px-6 py-6 text-[10px] font-bold text-slate-500 uppercase">{tx.addedBy}</td>}
                          {visibleColumns.paper && (
                             <td className="px-6 py-6">
                                <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase border border-indigo-100 italic">{tx.paper}</span>
                             </td>
                          )}
                          {visibleColumns.amount && <td className="px-6 py-6 text-base font-black text-slate-900 text-right italic">₹{tx.amount}</td>}
                          {visibleColumns.utr && <td className="px-6 py-6 text-[10px] font-mono text-slate-400">{tx.utr}</td>}
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-3">
                                <button onClick={() => { setSelectedTx(tx); setShowProofModal(true); }} className="w-10 h-10 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center"><Eye size={18}/></button>
                                {tx.status === 'PENDING' && (
                                   <>
                                      <button onClick={() => { setSelectedTx(tx); setShowRejectModal(true); }} className="w-10 h-10 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"><X size={18}/></button>
                                      <button onClick={() => setTransactions(prev => prev.map(p => p.id === tx.id ? { ...p, status: 'PAID' } : p))} className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center"><CheckCircle2 size={18}/></button>
                                   </>
                                )}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>

      {/* Proof Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 text-slate-900">
           <div className="bg-white max-w-2xl w-full rounded-[3rem] p-8 shadow-2xl relative animate-in zoom-in duration-300">
              <button onClick={() => setShowProofModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><XCircle size={32}/></button>
              <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center min-h-[400px]">
                    <img src={selectedTx?.proof} alt="Proof" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 flex flex-col justify-between py-4">
                    <div className="space-y-6">
                       <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">{selectedTx?.name}</h2>
                       <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">Amount</span><span className="text-xl font-black text-slate-900 italic">₹{selectedTx?.amount}</span></div>
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">UTR_ID</span><span className="text-[10px] font-mono text-indigo-600">{selectedTx?.utr}</span></div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => { setShowProofModal(false); setShowRejectModal(true); }} className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase border border-rose-100">REJECT</button>
                       <button onClick={() => { setTransactions(prev => prev.map(p => p.id === selectedTx.id ? { ...p, status: 'PAID' } : p)); setShowProofModal(false); }} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:scale-105 transition-all">APPROVE</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[210] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-2xl p-8 shadow-2xl animate-in scale-in duration-200 border border-slate-200">
             <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Rejection Remark</h2><button onClick={() => setShowRejectModal(false)}><X size={20}/></button></div>
             <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Explain why..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs font-bold text-slate-700 outline-none h-32 resize-none transition-all" />
             <div className="flex gap-4 mt-8"><button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 text-[10px] font-bold text-slate-400 uppercase">Cancel</button><button onClick={() => { setTransactions(prev => prev.map(p => p.id === selectedTx.id ? { ...p, status: 'REJECTED', reason: rejectReason } : p)); setShowRejectModal(false); setRejectReason(''); }} className="flex-2 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-rose-200" disabled={!rejectReason}>Confirm Reject</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
