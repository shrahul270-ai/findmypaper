"use client";

import React from 'react';
import { Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, Download, FileSpreadsheet, User, CreditCard, DollarSign } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';

export default function HawkerDashboard() {
  const deliveries = [
    { id: 'C104', name: 'Anil Mehta', address: 'Flat 402, Green Valley', status: 'DELIVERED', pay_mode: 'CASH', amount: 450 },
    { id: 'C105', name: 'Suresh Kumar', address: 'B-12, Rose Villa', status: 'PENDING', pay_mode: 'ONLINE', amount: 320 },
    { id: 'C106', name: 'Daily Needs Store', address: 'Shop No. 5, Market', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200 },
    { id: 'C107', name: 'Priya Singh', address: 'H.No 124, Gali 3', status: 'PENDING', pay_mode: 'SCANNER', amount: 500 },
  ];

  const handleDownloadCSV = () => {
    console.log("Generating CSV for Agent settlement...");
    // Logic to generate CSV blob would go here
    alert("Report Downloaded: settlement_report_05May.csv");
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">MY_ROUTE_TERMINAL</h1>
            <p className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest">Sector 4 - Rohini | 05 May 2026</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 shadow-sm"
            >
              <FileSpreadsheet size={18} className="text-green-600" />
              DOWNLOAD_SETTLEMENT_CSV
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-indigo-100">
              <Camera size={18} />
              MARK_ATTENDANCE
            </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="TODAY_CASH_COLLECTION" value="₹1,650" icon={DollarSign} />
          <StatCard title="DELIVERIES_COMPLETED" value="28/45" icon={CheckCircle2} />
          <StatCard title="PENDING_TASKS" value="17" icon={Clock} />
        </div>

        {/* Customer & Settlement List */}
        <div className="card p-0 overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500">SETTLEMENT_LOG: MY_CUSTOMERS</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] uppercase font-bold tracking-widest text-slate-400">
                  <th className="px-6 py-4">CUSTOMER_NAME / ID</th>
                  <th className="px-6 py-4">DELIVERY_STATUS</th>
                  <th className="px-6 py-4">PAYMENT_MODE</th>
                  <th className="px-6 py-4">BILL_AMOUNT</th>
                  <th className="px-6 py-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono italic">{item.id} | {item.address}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.status === 'DELIVERED' ? (
                          <span className="flex items-center gap-1 text-[9px] font-black text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full uppercase">
                            <CheckCircle2 size={10} /> DELIVERED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase">
                            <Circle size={10} /> PENDING
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                        {item.pay_mode === 'CASH' ? (
                          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase"><DollarSign size={10} /> CASH</div>
                        ) : (
                          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2 py-0.5 rounded uppercase"><CreditCard size={10} /> {item.pay_mode}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-700">₹{item.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-bold text-indigo-600 hover:underline uppercase">MARK_DELIVERED</button>
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
