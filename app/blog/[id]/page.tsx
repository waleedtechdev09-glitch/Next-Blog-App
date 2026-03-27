// app/blog/[id]/page.tsx

import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import LikeButton from "@/components/LikeButton"; // ← add karo

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  createdAt: string;
  likes: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const BlogPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const res = await fetch(`${baseUrl}/api/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Fetch failed with status:", res.status);
  }

  const data = await res.json();
  const blog: Blog = data.blog;

  if (!data.success || !blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <p
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Blog not found.
        </p>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 underline"
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/blog-logo.png"
            alt="logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            Devlog
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
          {["Articles", "Topics", "Newsletter", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="text-sm font-medium text-gray-900 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Get Started
        </a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Category */}
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
          {blog.category}
        </p>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {blog.title}
        </h1>

        {/* Author + Like Row */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{blog.author}</p>
              <p className="text-xs text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden mb-10 bg-gray-50">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
          {blog.description}
        </div>

        {/* Bottom Like Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-400">Did you enjoy this article?</p>
          <LikeButton blogId={blog._id} initialLikes={blog.likes || 0} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
