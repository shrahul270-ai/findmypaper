import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--divider)] p-6 rounded-lg shadow-sm hover:border-[var(--primary)] transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[var(--primary-glow)] rounded-md">
          <Icon className="text-[var(--primary)]" size={24} />
        </div>
        {change && (
          <span className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
