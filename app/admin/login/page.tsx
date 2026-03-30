"use client";
import { useState } from "react";
import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        alert("Invalid Password");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] selection:bg-indigo-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 r blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative w-full md:max-w-180 px-6">
        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-10 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-6">
              <KeyRound className="w-7 h-7 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Sign in to manage your dashboard and content
            </p>
          </div>

          {/* Input Group */}
          <div className="space-y-5">
            <div className="relative group">
              <label className="text-[13px] font-semibold text-slate-700 ml-1 mb-2 block">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="Enter access key"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-11 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="group w-full flex items-center justify-center cursor-pointer bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-slate-200"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center">
                  Continue to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>

          {/* Bottom Security Badge */}
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-medium uppercase tracking-widest">
              End-to-End Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
