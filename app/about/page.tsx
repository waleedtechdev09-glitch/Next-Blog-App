"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Target, Users, Zap, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* 1. Hero Section */}
      <section className="py-20 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            We believe in the power of{" "}
            <span className="text-[#48cae4] italic">words.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Devlog is a curated space where technology meets creativity. Our
            mission is to share insights that fuel curiosity and empower the
            next generation of thinkers.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/blog-logo.png"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2024, Devlog started as a small side project to
              document our learning journey in the world of Full-Stack
              development. Today, it has grown into a community of over 2,500
              readers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We don't just write about code; we write about the human
              experience behind the screen. From productivity hacks to deep
              technical dives, everything we publish is designed to add value to
              your life.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Values (Grid) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              What Drives Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="text-[#48cae4]" />,
                title: "Precision",
                desc: "We provide accurate and well-researched technical content.",
              },
              {
                icon: <Users className="text-[#48cae4]" />,
                title: "Community",
                desc: "Building a supportive space for developers and creators.",
              },
              {
                icon: <Zap className="text-[#48cae4]" />,
                title: "Innovation",
                desc: "Always exploring the latest trends like Next.js 15 and AI.",
              },
              {
                icon: <Heart className="text-[#48cae4]" />,
                title: "Passion",
                desc: "We love what we do, and it shows in every article.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Want to be part of our journey?
          </h2>
          <p className="text-gray-500 mb-8">
            Subscribe to our newsletter and never miss an update.
          </p>
          <button className="bg-[#48cae4] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b4d8] transition-all">
            Join the Community
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
