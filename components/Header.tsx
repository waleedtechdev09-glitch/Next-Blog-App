"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Header = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [inputError, setInputError] = useState("");

  // Real-time email format validation
  const validateEmail = (val: string) => {
    if (!val) return setInputError("");
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setInputError(isValid ? "" : "Please enter a valid email address");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setInputError("Email address is required");
      return toast.error("Please enter your email address", {
        icon: <AlertCircle className="text-yellow-500 w-5 h-5" />,
      });
    }

    if (inputError) {
      return toast.error("Please fix the email format first", {
        icon: <XCircle className="text-red-500 w-5 h-5" />,
      });
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/email", { email });

      if (response.data.success) {
        setSubscribed(true);
        setInputError("");
        toast.success("🎉 You're subscribed! Welcome to the community.", {
          icon: <CheckCircle2 className="text-green-500 w-5 h-5" />,
        });
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong";

      // Specific error messages based on backend response
      if (
        msg.toLowerCase().includes("already subscribed") ||
        msg.toLowerCase().includes("already exists")
      ) {
        toast.error("⚠️ This email is already subscribed!", {
          icon: <AlertCircle className="text-yellow-500 w-5 h-5" />,
        });
        setInputError("This email is already in our list");
      } else if (
        msg.toLowerCase().includes("invalid email") ||
        msg.toLowerCase().includes("format")
      ) {
        toast.error("❌ Invalid email format. Please check and try again.", {
          icon: <XCircle className="text-red-500 w-5 h-5" />,
        });
        setInputError("Invalid email format");
      } else if (msg.toLowerCase().includes("server")) {
        toast.error("🔴 Server error. Please try again later.", {
          icon: <XCircle className="text-red-500 w-5 h-5" />,
        });
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full bg-gradient-to-b from-slate-50 to-white border-b border-gray-100">
      {/* --- NAVIGATION BAR --- */}
      <Navbar />
      {/* --- HERO SECTION --- */}
      <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#48cae4]"></span>
            </span>
            <p className="text-[10px] font-bold text-[#48cae4] uppercase tracking-[0.2em]">
              New Perspectives Weekly
            </p>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Insights that fuel <br />
            <span className="text-[#48cae4] italic">curiosity.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto">
            A curated space for thinkers, creators, and leaders. We explore the
            intersections of technology, culture, and personal growth.
          </p>

          {/* Subscription Form */}
          <div className="relative max-w-lg mx-auto">
            <form
              onSubmit={handleSubscribe}
              className={`flex flex-col sm:flex-row gap-3 p-1.5 bg-white border rounded-2xl shadow-xl transition-all duration-300 ${
                inputError
                  ? "border-red-300 ring-4 ring-red-50 shadow-red-100"
                  : subscribed
                    ? "border-green-300 ring-4 ring-green-50 shadow-green-100"
                    : "border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 shadow-indigo-50/50"
              }`}
            >
              <div className="flex-1 flex items-center gap-2 px-2">
                {/* Input Status Icon */}
                {subscribed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                ) : inputError ? (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                ) : null}
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className="flex-1 px-3 py-3.5 text-sm text-gray-800 outline-none rounded-xl bg-transparent placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading || subscribed || !!inputError}
                className={`px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px] disabled:opacity-70 disabled:cursor-not-allowed ${
                  subscribed
                    ? "bg-green-600 text-white shadow-green-200 shadow-md"
                    : inputError
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : "bg-[#48cae4] hover:bg-[#00b4d8] cursor-pointer text-white active:scale-95 shadow-indigo-200 hover:shadow-md"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : subscribed ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Subscribed!
                  </span>
                ) : (
                  <>
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Inline Error Message below form */}
            {inputError && (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1 pl-2">
                <XCircle className="w-3.5 h-3.5" />
                {inputError}
              </p>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-8">
            <p className="text-sm text-gray-400">
              Join <span className="text-gray-900 font-semibold">2,500+</span>{" "}
              subscribers reading every Monday.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
