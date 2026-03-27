"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* --- NAVIGATION BAR --- */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-1 group">
          <Image
            src="/blog-logo.png"
            alt="logo"
            width={32}
            height={32}
            className="object-contain transition-transform group-hover:scale-110"
          />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            Devlog
          </span>
        </Link>

        {/* Links Section */}
        <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
          <Link
            href="/allBlogs"
            className="hover:text-gray-900 transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/topics"
            className="hover:text-gray-900 transition-colors"
          >
            Topics
          </Link>
          <Link
            href="/newsLetter"
            className="hover:text-gray-900 transition-colors"
          >
            Newsletter
          </Link>
          <Link href="/about" className="hover:text-gray-900 transition-colors">
            About
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="#"
          className="text-sm font-medium text-white border bg-[#48cae4] border-gray-200 rounded-lg px-4 py-2 hover:bg-[#00b4d8] transition-colors shadow-sm active:scale-95"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
