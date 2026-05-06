"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Mail, Smartphone, ArrowRight, Loader2, UserPlus, HelpCircle, X } from 'lucide-react';

export default function AuthPage() {
  const [view, setView] = useState('LOGIN'); // LOGIN, SIGNUP, FORGOT, OTP
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('VERIFIER'); // Default to Verifier as per recent work
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (view !== 'OTP') {
      // Simulate sending OTP
      setTimeout(() => {
        setLoading(false);
        setView('OTP');
      }, 1000);
    } else {
      // Finalizing Auth and Redirecting
      setTimeout(() => {
        setLoading(false);
        const target = role.toLowerCase();
        // Ensure proper routing
        window.location.href = `/${target}`;
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500">
        
        {/* Brand - Centered */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-[1.5rem] shadow-2xl shadow-indigo-100 mb-6 group hover:rotate-12 transition-all duration-500">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 italic uppercase">PAPERFLOW<span className="text-indigo-600">_ERP</span></h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Enterprise_Control_v10.0</p>
        </div>

        <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Decorative Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -translate-y-16 translate-x-16"></div>
          
          {/* Form Header */}
          <div className="mb-10 relative z-10">
            <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">
              {view === 'LOGIN' && 'Sign_In'}
              {view === 'SIGNUP' && 'Create_Account'}
              {view === 'FORGOT' && 'Reset_Pass'}
              {view === 'OTP' && 'Verify_Identity'}
            </h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
              {view === 'LOGIN' && 'Enter credentials to access portal'}
              {view === 'SIGNUP' && 'Register your distribution point'}
              {view === 'FORGOT' && 'OTP will be sent to WhatsApp'}
              {view === 'OTP' && `Code sent to Registered Phone`}
            </p>
          </div>

          <form onSubmit={handleAction} className="space-y-6 relative z-10">
            
            {view === 'SIGNUP' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Operator Name</label>
                  <input type="text" placeholder="FULL NAME" required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-bold uppercase italic" />
                </div>
              </div>
            )}

            {(view === 'LOGIN' || view === 'FORGOT' || view === 'SIGNUP') && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Identifier (Email/Phone)</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="ENTER CREDENTIALS" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-bold uppercase italic" 
                    />
                  </div>
                </div>
                
                {view !== 'FORGOT' && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Secure Password</label>
                    <div className="relative">
                      <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="password" placeholder="••••••••" required className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-bold" />
                    </div>
                  </div>
                )}
                
                {(view === 'LOGIN' || view === 'SIGNUP') && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Access Portal</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-black text-[10px] uppercase tracking-tighter italic"
                    >
                      <option value="VERIFIER">PAYMENT_VERIFIER (Live)</option>
                      <option value="AGENT">DISTRIBUTION_AGENT</option>
                      <option value="HAWKER">FIELD_HAWKER</option>
                      <option value="CUSTOMER">MEMBER_CUSTOMER</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {view === 'OTP' && (
              <div className="space-y-8 text-center animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between gap-2 max-w-[300px] mx-auto">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input key={i} type="text" maxLength={1} className="w-full h-14 md:h-16 text-center bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm" />
                  ))}
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">TEST_OTP_CREDENTIALS</p>
                  <p className="text-sm font-black text-indigo-600 mt-1">1 2 3 4 5 6</p>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  {view === 'OTP' ? 'VERIFY_&_ENTER' : 'CONTINUE_TO_PORTAL'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Helper Links */}
            <div className="pt-6 border-t border-slate-50 flex flex-col gap-4 text-center">
              {view === 'LOGIN' && (
                <div className="flex flex-col gap-2">
                   <button type="button" onClick={() => setView('FORGOT')} className="text-[9px] text-slate-400 font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Forgot Password?</button>
                   <button type="button" onClick={() => setView('SIGNUP')} className="text-[10px] text-indigo-600 font-black uppercase tracking-widest hover:underline">Register New Organization</button>
                </div>
              )}
              {(view === 'SIGNUP' || view === 'FORGOT' || view === 'OTP') && (
                <button type="button" onClick={() => setView('LOGIN')} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-indigo-600 flex items-center justify-center gap-2">
                   <X size={12} /> BACK_TO_LOGIN
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
