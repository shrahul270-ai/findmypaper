"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, Store, Bike, User, LayoutDashboard, 
  Users, CreditCard, BarChart3, Settings, 
  LogOut, ClipboardCheck, Wallet, MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'ADMIN' | 'VERIFIER' | 'AGENT' | 'HAWKER' | 'CUSTOMER';

interface SidebarProps {
  role: Role;
}

const navItems: Record<Role, any[]> = {
  ADMIN: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Agents', icon: Store, href: '/admin/agents' },
    { name: 'Hawkers', icon: Bike, href: '/admin/hawkers' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Billing', icon: CreditCard, href: '/admin/billing' },
    { name: 'Reports', icon: BarChart3, href: '/admin/reports' },
  ],
  VERIFIER: [
    { name: 'Verify Payments', icon: ClipboardCheck, href: '/verifier' },
  ],
  AGENT: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/agent' },
    { name: 'My Hawkers', icon: Bike, href: '/agent/hawkers' },
    { name: 'Customers', icon: Users, href: '/agent/customers' },
    { name: 'My Wallet', icon: Wallet, href: '/agent/wallet' },
  ],
  HAWKER: [
    { name: 'Delivery List', icon: ClipboardCheck, href: '/hawker' },
    { name: 'Attendance', icon: MapPin, href: '/hawker/attendance' },
  ],
  CUSTOMER: [
    { name: 'Subscription', icon: Newspaper, href: '/customer' },
    { name: 'Newspapers & Books', icon: BookOpen, href: '/customer/marketplace' },
    { name: 'Bills & Payments', icon: CreditCard, href: '/customer/billing' },
    { name: 'My Profile', icon: User, href: '/customer/profile' },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = navItems[role] || [];

  return (
    <aside className="w-64 h-screen bg-[var(--surface)] border-r border-[var(--divider)] flex flex-col sticky top-0">
      <div className="p-6 border-bottom border-[var(--divider)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--primary)] font-bold text-2xl">▶</span>
          <span className="font-bold tracking-tighter text-xl">PAPERFLOW<span className="text-[var(--primary)]">_ERP</span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-4">
          <div className="bg-[var(--primary-glow)] border border-[var(--primary)] px-3 py-2 rounded-sm flex items-center gap-2">
            <Shield size={16} className="text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-[10px] font-bold tracking-widest uppercase">{role.replace('_', ' ')}</span>
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-all group",
                pathname === item.href 
                  ? "bg-[var(--primary-glow)] text-[var(--primary)] border-l-2 border-[var(--primary)]" 
                  : "text-gray-400 hover:bg-[var(--surface-2)] hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(pathname === item.href ? "text-[var(--primary)]" : "group-hover:text-white")} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-[var(--divider)]">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-red-500 hover:bg-red-500/10 rounded-md transition-all font-bold text-sm tracking-widest">
          <LogOut size={20} />
          TERMINATE_SESSION
        </button>
      </div>
    </aside>
  );
}
