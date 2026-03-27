"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, FileText, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .sidebar-root { font-family: 'DM Sans', sans-serif; }
        .nav-item { position: relative; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .nav-item.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 2px; height: 55%; background: #111827; border-radius: 0 3px 3px 0; }
        .chevron-icon { transition: transform 0.2s ease, opacity 0.2s ease; opacity: 0; }
        .nav-item:hover .chevron-icon { opacity: 1; transform: translateX(3px); }
        .icon-wrap { transition: all 0.2s ease; }
        .nav-item:hover .icon-wrap { transform: scale(1.08); }
      `}</style>

      <aside className="sidebar-root fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="px-6 pt-5 pb-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-1 w-fit group">
            <Image
              src="/blog-logo.png"
              alt="logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span
              className="text-lg text-gray-900 tracking-tight"
              style={{ fontWeight: 600 }}
            >
              Devlog
            </span>
          </Link>
        </div>

        {/* Label */}
        <div className="px-5 pt-5 pb-2">
          <p
            className="text-gray-400"
            style={{
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Main Menu
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-0.5">
          {menuItems.map((item) => {
            // ✅ Add Blog default active on /admin
            const isActive =
              pathname === item.path ||
              (item.path === "/admin/addProduct" && pathname === "/admin");
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive ? "active" : ""} flex items-center gap-3 px-3 py-2.5 rounded-lg group ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div
                  className={`icon-wrap w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-700"
                  }`}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-none mb-0.5"
                    style={{ fontWeight: isActive ? 600 : 400 }}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`text-[10px] leading-none truncate ${isActive ? "text-white/50" : "text-gray-400"}`}
                  >
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  size={12}
                  className={`chevron-icon flex-shrink-0 ${isActive ? "text-white/40" : "text-gray-400"}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5">
          <div className="h-px bg-gray-100 mb-3" />
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
            <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-none mb-0.5 truncate">
                Admin
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-gray-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
