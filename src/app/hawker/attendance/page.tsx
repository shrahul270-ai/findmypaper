import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Camera, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function HawkerAttendance() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">FIELD_OPERATIONS: ATTENDANCE</p>
          <h1 className="text-2xl font-bold tracking-tight">ATTENDANCE_TERMINAL</h1>
        </header>

        <div className="max-w-xl mx-auto space-y-8">
          <div className="bg-indigo-600 p-12 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
            <div className="relative z-10">
              <Camera className="mx-auto mb-6 opacity-80 group-hover:scale-110 transition-transform" size={64} />
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">MARK_PRESENT</h2>
              <p className="text-xs font-bold opacity-70">Requires Camera & GPS access</p>
            </div>
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-2 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                GPS_LOCKED
              </div>
            </div>
          </div>

          <div className="card space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">ATTENDANCE_LOG</h3>
            <div className="space-y-3">
              {[
                { date: '04 May 2026', time: '05:30 AM', status: 'VERIFIED' },
                { date: '03 May 2026', time: '05:45 AM', status: 'VERIFIED' }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={18} /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{log.date}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{log.time}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">{log.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-amber-600 mt-1" size={20} />
            <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
              NOTE: Your attendance must be marked between 05:00 AM and 07:00 AM daily. Late attendance may affect your route assignment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
