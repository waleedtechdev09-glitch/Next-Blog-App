"use client";

import React from "react";
import Link from "next/link";
import { Hammer, ArrowLeft, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Topics = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center px-6 mb-6">
        {/* NAVBAR */}

        <div className="max-w-2xl w-full text-center mt-4">
          {/* Animated Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 mb-8 animate-bounce">
            <Hammer className="w-10 h-10 text-[#48cae4]" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#48cae4]/10 border border-[#48cae4]/20 text-[#48cae4] text-[10px] font-bold uppercase tracking-widest">
              Work in Progress
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Something <span className="text-[#48cae4] italic">Great</span>{" "}
            <br /> is brewing.
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            We're fine-tuning the last bits of this feature to give you the best
            reading experience. Stay tuned for the big reveal!
          </p>

          {/* Progress Bar (Visual Only) */}
          <div className="max-w-md mx-auto h-2 bg-gray-100 rounded-full mb-12 overflow-hidden">
            <div className="h-full bg-[#48cae4] w-[65%] animate-pulse transition-all duration-1000"></div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Go back home
            </Link>

            <button className="flex items-center gap-2 bg-[#48cae4] text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-[#00b4d8] transition-all shadow-lg shadow-[#48cae4]/20 active:scale-95">
              <Bell className="w-4 h-4" /> Notify me
            </button>
          </div>

          {/* Background Subtle Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-[#48cae4]/5 blur-[120px] rounded-full"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Topics;
