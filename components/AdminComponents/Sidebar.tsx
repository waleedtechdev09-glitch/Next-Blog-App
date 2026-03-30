"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, FileText, CreditCard, Menu, X } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    {
      name: "Add Blog",
      icon: PlusCircle,
      path: "/admin/addProduct",
      description: "Create new post",
    },
    {
      name: "Blog List",
      icon: FileText,
      path: "/admin/blogList",
      description: "Manage posts",
    },
    {
      name: "Subscription",
      icon: CreditCard,
      path: "/admin/subscription",
      description: "Billing & plans",
    },
  ];

  const closeMobileMenu = () => setIsMobileOpen(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";")[0];
    };

    const auth = getCookie("admin-auth");
    setIsLoggedIn(auth === "true");
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    setIsLoggedIn(false); // ✅ immediately hide button
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col shadow-sm z-40">
        <div className="px-6 pt-5 pb-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/blog-logo.png" alt="logo" width={32} height={32} />
            <span className="text-lg font-semibold">Devlog</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={16} />
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <div className="h-px bg-gray-100 mb-3" />

          {/* ✅ Show logout only if logged in */}
          {isLoggedIn && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full mt-2 bg-[#48cae4] hover:bg-[#5BC0EB] text-white text-sm py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white h-16 flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/blog-logo.png" alt="logo" width={28} height={28} />
          <span className="font-semibold">Devlog</span>
        </Link>

        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white z-40 transition-transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="flex-1 px-3 mt-20">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          {/* ✅ Show logout only if logged in */}
          {isLoggedIn && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full mt-4 bg-[#48cae4] text-white py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-xl p-5 w-[300px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-3 py-1.5 text-sm rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
