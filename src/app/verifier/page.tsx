"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, Download, ChevronDown, User, 
  Building2, Bike, Newspaper, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, ArrowDownLeft, MoreVertical,
  Mail, Hash, Calendar, DollarSign, Wallet, AlertCircle, X, PhoneCall, RefreshCw,
  Image as ImageIcon, Eye, ShieldCheck, Send, MessageSquare, Share2
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Sample Data
  const [transactions, setTransactions] = useState([
    { id: '5101', name: 'Amit Verma', phone: '9876543210', email: 'amit@findmypaper.com', addedBy: 'Ramesh (Hawker)', paper: 'Dainik Bhaskar', amount: 450.00, status: 'PAID', time: '11:23 PM', paymentId: 'UTR123' },
    { id: '2182', name: 'Priya Dhar', phone: '9988776655', email: 'priya@findmypaper.com', addedBy: 'Amit (Agent)', paper: 'TOI', amount: 320.00, status: 'PENDING', time: '11:16 PM', paymentId: '-' },
    { id: '9756', name: 'Suresh Kumar', phone: '9555666777', email: 'suresh@findmypaper.com', addedBy: 'Ramesh (Hawker)', paper: 'Amar Ujala', amount: 500.00, status: 'PAID', time: '10:05 PM', paymentId: 'UTR456' }
  ]);

  const agents = [
    { name: 'Amit (Agent)', phone: '919876543210', group: 'Sita Ram Agency' },
    { name: 'Sanjay (Agent)', phone: '919122334455', group: 'Metro News' }
  ];

  const hawkers = [
    { name: 'Ramesh (Hawker)', phone: '919988776655', agency: 'Sita Ram Agency' },
    { name: 'Rahul (Hawker)', phone: '919555666777', agency: 'Metro News' }
  ];

  const handleWhatsAppShare = (target: any) => {
    const targetTxs = transactions.filter(t => t.addedBy.includes(target.name));
    const total = targetTxs.reduce((acc, curr) => acc + curr.amount, 0);
    const paid = targetTxs.filter(t => t.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
    const pending = total - paid;

    let message = `*DAILY_PAYMENT_REPORT - ${new Date().toLocaleDateString()}*\n`;
    message += `----------------------------------\n`;
    message += `👤 *To:* ${target.name}\n`;
    message += `💰 *Total Amount:* ₹${total}\n`;
    message += `✅ *Received:* ₹${paid}\n`;
    message += `⏳ *Pending:* ₹${pending}\n\n`;
    message += `*CUSTOMER_BREAKDOWN:*\n`;
    
    targetTxs.forEach(tx => {
      message += `• ${tx.name}: ₹${tx.amount} [${tx.status}]\n`;
    });

    message += `\n----------------------------------\n`;
    message += `_FindMyPaper Audit Terminal_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${target.phone}?text=${encodedMessage}`, '_blank');
  };

  const filteredTransactions = transactions.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.phone.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
           <div>
             <h1 className="text-2xl font-black text-[#2B3674] italic uppercase tracking-tighter">Audit Terminal</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financial Oversight Console</p>
           </div>
           <button 
            onClick={() => setShowDispatchModal(true)}
            className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-indigo-200 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
           >
              <Share2 size={18} /> DISPATCH_TO_WHATSAPP
           </button>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Grand Revenue</p><p className="text-3xl font-black text-[#2B3674]">₹1,25,450</p></div>
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"><p className="text-[10px] font-black text-emerald-500 uppercase mb-2">Verified Collection</p><p className="text-3xl font-black text-[#2B3674]">₹85,200</p></div>
           <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white"><p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Pending Audit</p><p className="text-3xl font-black italic">₹40,250</p></div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
           <div className="flex justify-between items-center mb-10">
              <div className="relative w-96 text-slate-900">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input type="text" placeholder="Search customer, mobile..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-[#F4F7FE] border-none rounded-2xl text-xs font-bold text-[#2B3674] outline-none" />
              </div>
              <div className="flex gap-4">
                 <button className="p-4 bg-[#F4F7FE] text-[#2B3674] rounded-2xl hover:bg-slate-200 transition-all"><Filter size={18}/></button>
                 <button className="p-4 bg-[#F4F7FE] text-[#2B3674] rounded-2xl hover:bg-slate-200 transition-all"><Download size={18}/></button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                       <th className="px-4 py-6">Customer</th>
                       <th className="px-4 py-6">Mobile</th>
                       <th className="px-4 py-6">Source</th>
                       <th className="px-4 py-6">Paper</th>
                       <th className="px-4 py-6 text-right">Amount</th>
                       <th className="px-4 py-6">Proof</th>
                       <th className="px-4 py-6 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredTransactions.map((tx) => (
                       <tr key={tx.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="px-4 py-8"><p className="text-xs font-black text-[#2B3674] uppercase tracking-tighter">{tx.name}</p></td>
                          <td className="px-4 py-8 text-[11px] font-black text-indigo-600 italic">{tx.phone}</td>
                          <td className="px-4 py-8 text-[10px] font-bold text-slate-500 uppercase">{tx.addedBy}</td>
                          <td className="px-4 py-8"><span className="text-[9px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 uppercase">{tx.paper}</span></td>
                          <td className="px-4 py-8 text-sm font-black text-[#2B3674] text-right italic">₹{tx.amount}</td>
                          <td className="px-4 py-8">
                             <button onClick={() => { setSelectedTx(tx); setShowProofModal(true); }} className="p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition-all"><Eye size={14}/></button>
                          </td>
                          <td className="px-4 py-8 text-right">
                             <div className="flex justify-end gap-2">
                                {tx.status === 'PENDING' ? (
                                   <>
                                      <button onClick={() => { setSelectedTx(tx); setShowRejectModal(true); }} className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><X size={18}/></button>
                                      <button onClick={() => setTransactions(prev => prev.map(p => p.id === tx.id ? { ...p, status: 'PAID' } : p))} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle2 size={18}/></button>
                                   </>
                                ) : (
                                   <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest", tx.status === 'PAID' ? "bg-emerald-500 text-white shadow-lg" : "bg-rose-500 text-white shadow-lg")}>{tx.status}</span>
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

      {/* Dispatch Modal - WHATSAPP FOCUS */}
      {showDispatchModal && (
         <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 text-slate-900">
            <div className="bg-white max-w-lg w-full rounded-[3.5rem] p-12 shadow-2xl relative animate-in zoom-in duration-300">
               <button onClick={() => setShowDispatchModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900"><XCircle size={32}/></button>
               <h2 className="text-3xl font-black text-[#2B3674] uppercase italic tracking-tighter text-center mb-4">Report Dispatch</h2>
               <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 italic">Auto-generate & Share Daily Payment Logs</p>
               
               <div className="space-y-10">
                  {/* Select Agent Group */}
                  <div>
                     <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 px-2">Agents / Agencies</p>
                     <div className="space-y-3">
                        {agents.map(a => (
                           <button key={a.name} onClick={() => handleWhatsAppShare(a)} className="w-full flex items-center justify-between p-5 bg-[#F4F7FE] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-[1.5rem] group transition-all">
                              <div className="text-left">
                                 <p className="text-xs font-black text-[#2B3674] uppercase italic leading-none mb-1">{a.name}</p>
                                 <p className="text-[9px] font-bold text-slate-400">{a.group}</p>
                              </div>
                              <div className="bg-emerald-500 text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-all"><MessageSquare size={16}/></div>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Select Hawker Group */}
                  <div>
                     <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4 px-2">Individual Hawkers</p>
                     <div className="space-y-3">
                        {hawkers.map(h => (
                           <button key={h.name} onClick={() => handleWhatsAppShare(h)} className="w-full flex items-center justify-between p-5 bg-[#F4F7FE] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-[1.5rem] group transition-all">
                              <div className="text-left">
                                 <p className="text-xs font-black text-[#2B3674] uppercase italic leading-none mb-1">{h.name}</p>
                                 <p className="text-[9px] font-bold text-slate-400">{h.agency}</p>
                              </div>
                              <div className="bg-emerald-500 text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-all"><MessageSquare size={16}/></div>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Proof Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[220] p-4 text-slate-900">
           <div className="bg-white max-w-2xl w-full rounded-[3rem] p-8 shadow-2xl relative animate-in zoom-in duration-300 overflow-hidden">
              <button onClick={() => setShowProofModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><XCircle size={32}/></button>
              <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center min-h-[400px]">
                    <img src={selectedTx?.proof} alt="Payment Proof" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 flex flex-col justify-between py-4">
                    <div className="space-y-6">
                       <h2 className="text-3xl font-black text-[#2B3674] italic uppercase tracking-tighter leading-none">{selectedTx?.name}</h2>
                       <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">Amount</span><span className="text-lg font-black text-[#2B3674]">₹{selectedTx?.amount}</span></div>
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">UTR_ID</span><span className="text-[10px] font-mono text-indigo-600">{selectedTx?.paymentId}</span></div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => { setShowProofModal(false); setShowRejectModal(true); }} className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-100">REJECT</button>
                       <button onClick={() => { setTransactions(prev => prev.map(p => p.id === selectedTx.id ? { ...p, status: 'PAID' } : p)); setShowProofModal(false); }} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">APPROVE</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[230] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl animate-in scale-in duration-200">
             <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Audit Rejection</h2><button onClick={() => setShowRejectModal(false)}><X size={20}/></button></div>
             <p className="text-xs text-slate-500 mb-6 font-medium">Explain rejection to <strong>{selectedTx?.name}</strong>.</p>
             <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g. UTR mismatch..." className="w-full bg-[#F4F7FE] border-none rounded-2xl p-5 text-xs font-bold text-slate-700 outline-none h-32 resize-none shadow-inner transition-all" />
             <div className="flex gap-4 mt-8"><button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Back</button><button onClick={() => { setTransactions(prev => prev.map(p => p.id === selectedTx.id ? { ...p, status: 'REJECTED', reason: rejectReason } : p)); setShowRejectModal(false); setRejectReason(''); }} className="flex-2 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all" disabled={!rejectReason}>Confirm Reject</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
