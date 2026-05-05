"use client";

import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, Download, FileSpreadsheet, User, CreditCard, DollarSign, X } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';

export default function HawkerDashboard() {
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450 },
    { id: 'C105', name: 'Suresh Kumar', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320 },
    { id: 'C106', name: 'Daily Needs Store', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200 },
    { id: 'C107', name: 'Priya Singh', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'SCANNER', amount: 500 },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleDownloadCSV = () => {
    setNotification("Settlement CSV generated and downloaded!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMarkAttendance = () => {
    setAttendanceMarked(true);
    setNotification("Attendance marked successfully via Camera Verification!");
    setTimeout(() => setNotification(null), 3000);
  };

  const markAsDelivered = (id: string) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: 'DELIVERED' } : d));
    setNotification("Status updated to DELIVERED!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && (
          <div className="fixed top-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 animate-slide-in">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <p className="text-xs font-black uppercase tracking-widest">{notification}</p>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">MY_ROUTE_TERMINAL</h1>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">Sector 4 - Rohini | 05 May 2026</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all"
            >
              <FileSpreadsheet size={16} className="text-green-600" />
              DOWNLOAD_SETTLEMENT_CSV
            </button>
            <button 
              onClick={handleMarkAttendance}
              disabled={attendanceMarked}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all",
                attendanceMarked ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white shadow-indigo-100 hover:scale-105"
              )}
            >
              <Camera size={16} />
              {attendanceMarked ? "ATTENDANCE_DONE" : "MARK_ATTENDANCE"}
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="TODAY_CASH_COLLECTION" value="₹1,650" icon={DollarSign} />
          <StatCard title="DELIVERIES_COMPLETED" value={`${deliveries.filter(d => d.status === 'DELIVERED').length}/${deliveries.length}`} icon={CheckCircle2} />
          <StatCard title="PENDING_TASKS" value={deliveries.filter(d => d.status === 'PENDING').length.toString()} icon={Clock} />
        </div>

        {/* Customer & Settlement List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg"><Navigation size={20} /></div>
               <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">SETTLEMENT_LOG: MY_CUSTOMERS</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_NAME / ID</th>
                  <th className="px-8 py-5">DELIVERY_STATUS</th>
                  <th className="px-8 py-5">PAYMENT_MODE</th>
                  <th className="px-8 py-5">BILL_AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.id} | {item.address}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {item.status === 'DELIVERED' ? (
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full uppercase tracking-widest">
                            <CheckCircle2 size={10} /> DELIVERED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">
                            <Circle size={10} /> PENDING
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-[10px] font-black">
                        {item.pay_mode === 'CASH' ? (
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-xl uppercase tracking-widest border border-blue-100"><DollarSign size={10} /> CASH</div>
                        ) : (
                          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 rounded-xl uppercase tracking-widest border border-purple-100"><CreditCard size={10} /> {item.pay_mode}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 italic tracking-tighter">₹{item.amount}</td>
                    <td className="px-8 py-6 text-right">
                      {item.status === 'PENDING' ? (
                        <button 
                          onClick={() => markAsDelivered(item.id)}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all"
                        >
                          MARK_DELIVERED
                        </button>
                      ) : (
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">COMPLETED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
