"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, User, Calendar } from "lucide-react";
import Link from "next/link";

interface Blog {
  author: string;
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt?: string;
}

const CinematicPostCard = () => {
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedBlog = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success && data.blogs.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.blogs.length);
        setFeaturedBlog(data.blogs[randomIndex]);
      }
    } catch (err) {
      console.error("Error fetching featured blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBlog();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="w-full h-[550px] bg-slate-50 animate-pulse rounded-[1rem] border border-slate-100"></div>
      </section>
    );
  }

  if (!featuredBlog) return null;

  return (
    <>
      <h2
        className="text-3xl font-bold text-gray-900 text-center"
        style={{ fontFamily: "Georgia, serif" }}
      >
        DevLog Exclusive
      </h2>
      <section className="max-w-6xl mx-auto px-6 py-20 overflow-hidden">
        <div className="group relative w-full h-[550px] md:h-[650px] overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          {/* --- Smooth Scaling Background --- */}
          <Image
            src={featuredBlog.image || "/blog-logo.png"}
            alt={featuredBlog.title}
            fill
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            priority
          />

          {/* --- Multi-Layer Overlay --- */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>

          {/* --- Content Overlay --- */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20">
            <div className="max-w-4xl transform transition-all duration-700 group-hover:translate-y-[-10px]">
              {/* Glassmorphic Author Badge */}
              <div className="flex items-center gap-4 mb-8">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center gap-2 shadow-xl">
                  <div className="w-6 h-6 bg-[#48cae4] rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                    {featuredBlog.author || "Guest Author"}
                  </span>
                </div>
                <span className="h-[1px] w-12 bg-[#48cae4]"></span>
              </div>

              {/* Title with improved Typography */}
              <h2
                className="text-4xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight drop-shadow-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {featuredBlog.title}
              </h2>

              {/* Description */}
              <p className="text-gray-200/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl line-clamp-3 font-light drop-shadow-md">
                {featuredBlog.description}
              </p>

              {/* Action Button - Animated */}
              <div className="flex flex-wrap items-center gap-8">
                <Link
                  href={`/blog/${featuredBlog.slug || featuredBlog._id}`}
                  className="relative overflow-hidden group/btn flex items-center gap-4 px-10 py-5 bg-[#48cae4] text-white rounded-2xl font-black transition-all duration-300 hover:bg-[#00b4d8] hover:shadow-[0_15px_30px_rgba(72,202,228,0.4)] active:scale-95"
                >
                  <span className="relative z-10">READ FULL STORY</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  {/* Shine effect on hover */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover/btn:animate-shine" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Rotating Accent */}
          <div className="absolute top-12 right-12 hidden lg:flex items-center justify-center">
            <div className="absolute w-32 h-32 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-28 h-28 border-t-2 border-[#48cae4] rounded-full animate-[spin_3s_linear_infinite]"></div>
            <div className="relative text-white/40 text-[9px] font-black uppercase tracking-[0.4em] text-center bg-black/20 backdrop-blur-sm p-4 rounded-full">
              Exclusive
              <br />
              Post
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CinematicPostCard;
