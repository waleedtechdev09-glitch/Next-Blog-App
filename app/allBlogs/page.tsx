"use client";

import React, { useState, useEffect } from "react";
import BlogItem from "@/components/BlogItem"; // Path check karlein apne folder ke mutabiq
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  createdAt: string;
  slug: string;
}

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
        console.log("Sample Blog Data:", data.blogs[0]); // Check karein yahan 'slug' likha aa raha hai ya nahi
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-10"></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Full Archive
          </h1>
          <p className="text-gray-500 text-lg">
            Exploring {blogs.length} stories across technology and culture.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid - Yahan Sary Blogs Map Ho Rahy Hain */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBlogs.map((blog) => (
            <BlogItem
              key={blog._id}
              title={blog.title}
              id={blog.slug || blog._id}
              desc={blog.description}
              image={blog.image}
              category={blog.category}
            />
          ))}
        </div>

        {/* No Results found */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No articles found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllBlogsPage;
