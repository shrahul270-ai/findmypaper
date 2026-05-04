"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Mail, Smartphone, ArrowRight, Loader2, UserPlus, HelpCircle } from 'lucide-react';
import { WhatsAppService } from '@/lib/notifications';

export default function AuthPage() {
  const [view, setView] = useState('LOGIN'); // LOGIN, SIGNUP, FORGOT, OTP
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('AGENT');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In real app, we would call an API here.
    // For now, we simulate sending OTP via WhatsApp service
    if (view !== 'OTP') {
      console.log(`Sending OTP to ${phone || 'registered number'}...`);
      // We trigger our notification service
      // await WhatsAppService.sendOTP(phone, "123456"); 
      
      setTimeout(() => {
        setLoading(false);
        setView('OTP');
      }, 1200);
    } else {
      // Finalizing Auth
      setTimeout(() => {
        setLoading(false);
        const target = role.toLowerCase();
        router.push(`/${target}`);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-xl mb-4">
            <Shield className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 italic">PAPERFLOW<span className="text-indigo-600">_ERP</span></h1>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl shadow-slate-200 relative overflow-hidden">
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800">
              {view === 'LOGIN' && 'Welcome Back'}
              {view === 'SIGNUP' && 'Create Account'}
              {view === 'FORGOT' && 'Reset Password'}
              {view === 'OTP' && 'Verify Identity'}
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              {view === 'LOGIN' && 'Enter credentials to access portal'}
              {view === 'SIGNUP' && 'Register your distribution point'}
              {view === 'FORGOT' && 'OTP will be sent to your WhatsApp'}
              {view === 'OTP' && `Code sent to ${phone || 'registered phone'}`}
            </p>
          </div>

          <form onSubmit={handleAction} className="space-y-5">
            {view === 'SIGNUP' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input type="text" placeholder="Your Name" required className="auth-input w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">WhatsApp Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium" 
                    />
                  </div>
                </div>
              </div>
            )}

            {(view === 'LOGIN' || view === 'FORGOT' || view === 'SIGNUP') && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium" 
                    />
                  </div>
                </div>
                
                {view !== 'FORGOT' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Password</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input type="password" placeholder="••••••••" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium" />
                    </div>
                  </div>
                )}
                
                {(view === 'LOGIN' || view === 'SIGNUP') && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Registering As</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold text-xs"
                    >
                      <option value="AGENT">DISTRIBUTION_AGENT</option>
                      <option value="HAWKER">FIELD_HAWKER</option>
                      <option value="CUSTOMER">MEMBER_CUSTOMER</option>
                      <option value="VERIFIER">PAYMENT_VERIFIER</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {view === 'OTP' && (
              <div className="space-y-6 animate-fade-in text-center">
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center bg-slate-50 border border-slate-200 rounded-xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-600" />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Code sent to your phone. Use <span className="text-indigo-600">123456</span> to test.</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                view === 'OTP' ? 'VERIFY_&_ENTER' : 'CONTINUE_TO_OTP'
              )}
            </button>

            {/* Helper Links */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 text-center">
              {view === 'LOGIN' && (
                <>
                  <button type="button" onClick={() => setView('FORGOT')} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-indigo-600 flex items-center justify-center gap-1">
                    <HelpCircle size={12} /> Forgot Password?
                  </button>
                  <button type="button" onClick={() => setView('SIGNUP')} className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-1">
                    <UserPlus size={12} /> Don't have an account? Signup
                  </button>
                </>
              )}
              {(view === 'SIGNUP' || view === 'FORGOT' || view === 'OTP') && (
                <button type="button" onClick={() => setView('LOGIN')} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-indigo-600">
                  Back to Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
