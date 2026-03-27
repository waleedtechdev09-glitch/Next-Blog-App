"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons import karein

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Blogs", href: "/allBlogs" },
    { name: "Topics", href: "/topics" },
    { name: "Newsletter", href: "/newsLetter" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
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

        {/* --- DESKTOP LINKS --- */}
        <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-gray-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- DESKTOP CTA (Hidden on Mobile) --- */}
        <Link
          href="#"
          className="hidden md:block text-sm font-medium text-white border bg-[#48cae4] border-gray-200 rounded-lg px-4 py-2 hover:bg-[#00b4d8] transition-colors shadow-sm active:scale-95"
        >
          Get Started
        </Link>

        {/* --- MOBILE HAMBURGER ICON --- */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Link click hone par menu band ho jaye
                className="text-base font-medium text-gray-600 hover:text-[#48cae4] py-2 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
