"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileText, Tag, User, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authorPreview, setAuthorPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Technology",
    "Health",
    "Finance",
    "Lifestyle",
    "Education",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "author",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check — 10MB max
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    const url = URL.createObjectURL(file);
    if (type === "image") {
      setImage(file);
      setImagePreview(url);
    } else {
      setAuthorImage(file);
      setAuthorPreview(url);
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", category: "", author: "" });
    setImage(null);
    setAuthorImage(null);
    setImagePreview(null);
    setAuthorPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!image) {
      toast.warning("Please upload a blog cover image");
      return;
    }
    if (!authorImage) {
      toast.warning("Please upload an author photo");
      return;
    }

    setLoading(true);

    // Loading toast
    const toastId = toast.loading("Publishing your blog post...");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("author", form.author);
    formData.append("likes", "0");
    formData.append("image", image);
    formData.append("authorImage", authorImage);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.update(toastId, {
          render: "Blog published successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
        });
        resetForm();
      } else {
        toast.update(toastId, {
          render: data.message || "Failed to publish blog",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          closeOnClick: true,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Network error. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0 md:pt-0">
      {/* Mobile: No left padding, Desktop: ml-64 handled by layout */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 bg-black rounded-full" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Dashboard
            </p>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Add New Blog
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details below to publish a new blog post.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Blog Image Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
              <ImagePlus size={16} className="text-gray-400" />
              Blog Cover Image
            </label>

            {imagePreview ? (
              <div className="relative w-full h-40 md:h-52 rounded-xl overflow-hidden group">
                <Image
                  src={imagePreview}
                  alt="preview"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-3 right-3 bg-black text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="w-full h-40 md:h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <Upload size={18} />
                </div>
                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-900 px-4 text-center">
                  Click to upload cover image
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </button>
            )}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImage(e, "image")}
            />
          </div>

          {/* Text Fields */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 space-y-4 md:space-y-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText size={16} className="text-gray-400" />
              Blog Details
            </label>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter blog title..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Tag size={12} />
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4 md:mb-5">
              <User size={16} className="text-gray-400" />
              Author Details
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5">
              <div className="flex-shrink-0 w-full sm:w-auto">
                {authorPreview ? (
                  <div className="relative group">
                    <Image
                      src={authorPreview}
                      alt="author"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100"
                      width={64}
                      height={64}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAuthorImage(null);
                        setAuthorPreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => authorRef.current?.click()}
                    className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <Upload
                      size={14}
                      className="text-gray-400 group-hover:text-black"
                    />
                    <span className="text-[9px] text-gray-400 mt-0.5">
                      Photo
                    </span>
                  </button>
                )}
                <input
                  ref={authorRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e, "author")}
                />
              </div>

              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="e.g. Ali Hassan"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 cursor-pointer bg-black text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-gray-900 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-black/10"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Blog Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
