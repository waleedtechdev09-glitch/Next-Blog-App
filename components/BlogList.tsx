"use client";

import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem";

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

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // DB se blogs fetch karo
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
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

  // Categories dynamically blogs se nikalo
  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="w-full h-44 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-2">
          All Articles
        </p>
        <h2
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Browse by topic
        </h2>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-sm">
          No articles in this category yet.
        </div>
      )}
    </div>
  );
};

export default BlogList;
