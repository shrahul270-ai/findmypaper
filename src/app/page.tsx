"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Key, Mail, Smartphone, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('ADMIN');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating OTP verification & Role routing
    setTimeout(() => {
      setLoading(false);
      const target = role.toLowerCase();
      router.push(`/${target}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4 animate-bounce">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 italic">PAPERFLOW<span className="text-indigo-600">_ERP</span></h1>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-2">SECURE_ACCESS_GATEWAY</p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl shadow-slate-200 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
            <div className={`h-full bg-indigo-600 transition-all duration-500 ${step === 2 ? 'w-full' : 'w-1/2'}`}></div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">IDENTITY_EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@agency.com" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">ACCESS_PASSWORD</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">ASSIGNED_ROLE</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold text-xs appearance-none cursor-pointer"
                >
                  <option value="ADMIN">SYSTEM_ADMIN</option>
                  <option value="AGENT">DISTRIBUTION_AGENT</option>
                  <option value="HAWKER">FIELD_HAWKER</option>
                  <option value="VERIFIER">PAYMENT_VERIFIER</option>
                  <option value="CUSTOMER">MEMBER_CUSTOMER</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>INITIATE_LOGIN <ArrowRight size={16} /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full w-fit mx-auto mb-3">
                  <Smartphone size={24} />
                </div>
                <h2 className="font-bold text-slate-800">OTP_VERIFICATION</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">SENT_TO: +91 XXXXX X0021</p>
              </div>

              <div>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i}
                      type="text" 
                      maxLength={1}
                      placeholder="•"
                      className="w-12 h-14 text-center bg-slate-50 border border-slate-200 rounded-xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-center text-slate-400 font-bold mt-4">TESTING_MODE: USE CODE <span className="text-indigo-600">123456</span></p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>VERIFY_&_ENTER <ArrowRight size={16} /></>}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-indigo-600"
              >
                RE-ENTER_CREDENTIALS
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-8 text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">
          SECURED_BY_PAPERFLOW_SAAS_V2
        </p>
      </div>
    </div>
  );
}
