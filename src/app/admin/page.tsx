'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, HeartPulse, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@ludhianadental.com' && password === 'admin123') {
      sessionStorage.setItem('admin_authenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password. Use: admin@ludhianadental.com / admin123');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <HeartPulse className="h-10 w-10 text-blue-500 mx-auto animate-pulse" />
          <h1 className="text-2xl font-bold text-white">Doctor Dashboard Login</h1>
          <p className="text-xs text-slate-500">
            Secure access panel to manage patient leads & CMS settings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-550" />
              <input
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="admin@ludhianadental.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-550 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-550" />
              <input
                type="password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-555 transition-all font-mono"
              />
            </div>
          </div>

          {/* Hint alert */}
          <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl text-left flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-slate-500 leading-normal">
              <span className="font-semibold text-slate-350 block">Live Review Hint:</span>
              Use <code className="text-blue-300 font-mono">admin@ludhianadental.com</code> and password <code className="text-blue-300 font-mono">admin123</code>.
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-xs text-red-400 text-center font-medium bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all"
          >
            Access Secure Dashboard
          </button>
        </form>

      </div>
    </div>
  );
}
