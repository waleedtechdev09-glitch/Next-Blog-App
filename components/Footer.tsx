import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-lg font-bold text-gray-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Devlog
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              Practical articles on modern web development, design systems, and
              engineering. Written for developers who care about craft.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: FaGithub, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaInstagram, href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all duration-200"
                >
                  <item.Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "Home",
                "All Articles",
                "Projects",
                "Contact Us",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-5">
              Topics
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "Web Development",
                "UI/UX Design",
                "Cloud Architecture",
                "React & Next.js",
                "DevOps",
              ].map((cat) => (
                <li key={cat}>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-5">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest articles directly in your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
              />
              <button className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Devlog. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              All systems operational
            </span>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
