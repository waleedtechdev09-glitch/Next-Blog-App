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

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
        // Sirf pehle 4 blogs ko state mein save karein
        setBlogs(data.blogs.slice(0, 4));
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="w-full h-44 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
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
        <p className="text-xs text-[#48cae4] uppercase tracking-widest font-bold mb-2">
          Latest Updates
        </p>
        <h2
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Featured Stories
        </h2>
      </div>

      {/* Blog Grid - Yahan ab wahi 4 blogs show honge jo fetch mein slice kiye hain */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog) => (
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

      {blogs.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-sm">
          No articles published yet.
        </div>
      )}
    </div>
  );
};

export default BlogList;
