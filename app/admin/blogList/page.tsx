"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error("Error loading blogs");
    } finally {
      setLoading(false);
    }
  };

  // Function to open modal
  const confirmDelete = (id) => {
    setSelectedBlogId(id);
    setIsModalOpen(true);
  };

  // Function to actually delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/blog?id=${selectedBlogId}`);
      toast.success("Blog deleted successfully");
      setIsModalOpen(false);
      fetchBlogs(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setSelectedBlogId(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">All Blogs</h2>
        <p className="text-sm text-slate-500">{blogs.length} posts published</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-sm uppercase tracking-wider">
              <th className="px-4 py-4 font-semibold">Blog Image</th>
              <th className="px-4 py-4 font-semibold">Title</th>
              <th className="px-4 py-4 font-semibold">Date</th>
              <th className="px-4 py-4 font-semibold">Author</th>
              <th className="px-4 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-4 py-4">
                  <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={blog.image || "/placeholder-blog.png"}
                      alt="blog"
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-slate-800 line-clamp-1 max-w-[250px]">
                    {blog.title}
                  </p>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                {/* Author */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                      {blog.authorImage ? (
                        <Image
                          src={blog.authorImage}
                          alt={blog.author}
                          fill
                          className="object-cover"
                          width={0}
                          height={0}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-[10px] font-bold">
                          {blog.author?.[0] || "A"}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">
                      {blog.author}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => confirmDelete(blog._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Delete Blog Post?
            </h3>
            <p className="text-slate-500 mb-6">
              This action cannot be undone. This will permanently delete the
              blog post and remove the images from our servers.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
