"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Bike, Newspaper, CreditCard, 
  Settings, LogOut, BookOpen, MapPin, User, Store, ClipboardList, ShieldCheck, History 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = {
  ADMIN: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Agents', icon: Users, href: '/admin/agents' },
    { name: 'Reports', icon: ClipboardList, href: '/admin/reports' },
    { name: 'System Settings', icon: Settings, href: '/admin/settings' },
  ],
  AGENT: [
    { name: 'Depot Control', icon: LayoutDashboard, href: '/agent' },
    { name: 'Hawkers', icon: Bike, href: '/agent/hawkers' },
    { name: 'Accounting', icon: CreditCard, href: '/agent/accounting' },
    { name: 'Profile Settings', icon: Settings, href: '/agent/settings' },
  ],
  HAWKER: [
    { name: 'Deliveries', icon: Bike, href: '/hawker' },
    { name: 'My Profile', icon: User, href: '/hawker/profile' },
    { name: 'Account Settings', icon: Settings, href: '/hawker/settings' },
  ],
  CUSTOMER: [
    { name: 'Subscription', icon: Newspaper, href: '/customer' },
    { name: 'Billing & History', icon: CreditCard, href: '/customer/billing' },
    { name: 'Marketplace', icon: BookOpen, href: '/customer/marketplace' },
    { name: 'My Profile', icon: User, href: '/customer/profile' },
    { name: 'Security Settings', icon: ShieldCheck, href: '/customer/settings' },
  ],
  VERIFIER: [
    { name: 'Audit Terminal', icon: LayoutDashboard, href: '/verifier' },
    { name: 'Payment Logs', icon: History, href: '/verifier/logs' },
    { name: 'Profile Settings', icon: User, href: '/verifier/settings' },
  ]
};

export default function Sidebar({ role }: { role: keyof typeof menuItems }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = menuItems[role] || [];

  const handleLogout = () => {
    if (confirm("Are you sure you want to Logout?")) {
      window.location.href = '/'; 
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 hidden md:flex shrink-0">
      <div className="p-8 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-100">F</div>
          <h1 className="font-black tracking-tighter text-slate-900 text-xl italic uppercase leading-none">FINDMYPAPER</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] px-4 mb-4">MAIN_MENU</p>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest group",
              pathname === item.href
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            )}
          >
            <item.icon size={18} className={cn("transition-all", pathname === item.href ? "scale-110" : "group-hover:scale-110")} />
            <span className="text-[9px] font-black">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-2">
        <div className="px-4 py-3 bg-slate-50 rounded-2xl mb-4">
           <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">CURRENT_ROLE</p>
           <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter italic flex items-center gap-2">
              <ShieldCheck size={10} /> {role}_CONSOLE
           </p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-4 text-rose-500 hover:bg-rose-50 rounded-xl transition-all text-[10px] font-black uppercase tracking-[0.2em] border border-transparent hover:border-rose-100 group shadow-sm hover:shadow-md"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-all" />
          TERMINATE_SESSION
        </button>
      </div>
    </aside>
  );
}
