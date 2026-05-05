"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Bike, Newspaper, CreditCard, 
  Settings, LogOut, BookOpen, MapPin, User, Store, ClipboardList 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = {
  ADMIN: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Agents', icon: Users, href: '/admin/agents' },
    { name: 'Reports', icon: ClipboardList, href: '/admin/reports' },
  ],
  AGENT: [
    { name: 'Depot Control', icon: LayoutDashboard, href: '/agent' },
    { name: 'Hawkers', icon: Bike, href: '/agent/hawkers' },
    { name: 'Accounting', icon: CreditCard, href: '/agent/accounting' },
  ],
  HAWKER: [
    { name: 'Deliveries', icon: Bike, href: '/hawker' },
    { name: 'My Profile', icon: User, href: '/hawker/profile' },
  ],
  CUSTOMER: [
    { name: 'Subscription', icon: Newspaper, href: '/customer' },
    { name: 'Marketplace', icon: BookOpen, href: '/customer/marketplace' },
    { name: 'Billing', icon: CreditCard, href: '/customer/billing' },
    { name: 'My Profile', icon: User, href: '/customer/profile' },
  ],
};

export default function Sidebar({ role }: { role: keyof typeof menuItems }) {
  const pathname = usePathname();
  const items = menuItems[role] || [];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-8 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic">F</div>
          <h1 className="font-black tracking-tighter text-slate-900 text-xl italic uppercase">FINDMYPAPER</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest",
              pathname === item.href
                ? "bg-indigo-50 text-indigo-600 shadow-sm"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            )}
          >
            <item.icon size={18} />
            <span className="text-[10px]">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-2">
        <div className="px-4 py-2">
           <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">POWERED_BY</p>
           <p className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">BALAJIPRIMMEDIA TEAM</p>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
          <LogOut size={18} />
          TERMINATE_SESSION
        </button>
      </div>
    </aside>
  );
}
