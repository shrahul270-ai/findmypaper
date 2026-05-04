import React from 'react';
import { Camera, MapPin, CheckCircle2, Circle, Clock, Navigation } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';

export default function HawkerDashboard() {
  const deliveries = [
    { id: 1, address: 'Flat 402, Green Valley Apartments', customer: 'Anil Mehta', status: 'PENDING' },
    { id: 2, address: 'B-12, Rose Villa, Sector 4', customer: 'Suresh Kumar', status: 'DELIVERED' },
    { id: 3, address: 'Shop No. 5, Market Square', customer: 'Daily Needs Store', status: 'PENDING' },
    { id: 4, address: 'H.No 124, Gali No. 3', customer: 'Priya Singh', status: 'PENDING' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-6 md:p-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DELIVERY_TERMINAL</h1>
              <p className="text-[var(--muted)] text-sm">Assigned Route: Sector 4 - Rohini</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                <Camera size={18} />
                MARK_ATTENDANCE
              </button>
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="TOTAL_DELIVERIES" value="124" icon={Navigation} />
          <StatCard title="COMPLETED" value="86" icon={CheckCircle2} />
          <StatCard title="PENDING" value="38" icon={Clock} />
        </div>

        {/* Attendance Alert if not marked */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 mb-8">
          <MapPin className="text-amber-600 mt-1" size={20} />
          <div>
            <h3 className="text-amber-800 font-bold text-sm">ATTENDANCE_REQUIRED</h3>
            <p className="text-amber-700 text-xs">Please capture a selfie at your start location to begin your route tracking.</p>
          </div>
        </div>

        {/* Delivery List */}
        <div className="card">
          <h2 className="text-sm font-bold tracking-wider mb-6 text-[var(--muted)] uppercase">TODAY_ROUTE_MAP</h2>
          
          <div className="space-y-4">
            {deliveries.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  item.status === 'DELIVERED' 
                    ? 'bg-green-50 border-green-100 opacity-75' 
                    : 'bg-white border-[var(--divider)] hover:border-[var(--primary)] shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 ${item.status === 'DELIVERED' ? 'text-green-600' : 'text-gray-300'}`}>
                    {item.status === 'DELIVERED' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${item.status === 'DELIVERED' ? 'text-green-900 line-through' : 'text-slate-900'}`}>
                      {item.address}
                    </p>
                    <p className="text-[var(--muted)] text-xs font-medium">{item.customer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.status === 'PENDING' ? (
                    <button className="text-[var(--primary)] font-bold text-[10px] tracking-widest bg-[var(--primary-glow)] px-3 py-1.5 rounded-md hover:bg-[var(--primary)] hover:text-white transition-all uppercase">
                      MARK_DONE
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold text-[10px] tracking-widest uppercase">DONE</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
