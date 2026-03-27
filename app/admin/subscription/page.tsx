"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Mail,
  Users,
  RefreshCw,
  Search,
  AlertTriangle,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Subscriber {
  _id: string;
  email: string;
  date: string;
  createdAt: string; // timestamps: true se bhi aata hai, backup ke liye
}

// ── Delete Confirmation Modal ──────────────────────────────────────────────
const DeleteModal = ({
  email,
  onConfirm,
  onCancel,
  loading,
}: {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>

      {/* Text */}
      <h2 className="text-lg font-bold text-gray-900 text-center mb-1">
        Remove Subscriber?
      </h2>
      <p className="text-sm text-gray-500 text-center mb-2">
        You are about to remove:
      </p>
      <p className="text-sm font-semibold text-indigo-600 text-center bg-indigo-50 rounded-xl px-4 py-2 mb-6 break-all">
        {email}
      </p>
      <p className="text-xs text-gray-400 text-center mb-6">
        This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {loading ? "Removing..." : "Yes, Remove"}
        </button>
      </div>
    </div>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────
const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Modal state
  const [modalTarget, setModalTarget] = useState<Subscriber | null>(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/email");
      setSubscribers(res.data.subscribers || []);
    } catch {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Opens modal
  const confirmDelete = (subscriber: Subscriber) => {
    setModalTarget(subscriber);
  };

  // Called when user clicks "Yes, Remove" in modal
  const handleDelete = async () => {
    if (!modalTarget) return;

    try {
      setDeletingId(modalTarget._id);
      await axios.delete(`/api/email/${modalTarget._id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== modalTarget._id));
      setModalTarget(null);
      toast.success(`${modalTarget.email} removed successfully!`);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Failed to delete subscriber";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      {/* Delete Confirmation Modal */}
      {modalTarget && (
        <DeleteModal
          email={modalTarget.email}
          loading={deletingId === modalTarget._id}
          onConfirm={handleDelete}
          onCancel={() => setModalTarget(null)}
        />
      )}

      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your newsletter subscribers
              </p>
            </div>
            <button
              onClick={fetchSubscribers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-indigo-50 p-3 rounded-xl">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-green-50 p-3 rounded-xl">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    subscribers.filter((s) => {
                      const d = new Date(s.createdAt);
                      const now = new Date();
                      return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-amber-50 p-3 rounded-xl">
                <Search className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Search Results
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filtered.length}
                </p>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Search */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>
            </div>

            {/* Table Body */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
                  <p className="text-sm text-gray-400">
                    Loading subscribers...
                  </p>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Mail className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {search ? "No results found" : "No subscribers yet"}
                </p>
                <p className="text-xs text-gray-400">
                  {search
                    ? "Try a different search term"
                    : "Share your newsletter to get started"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Subscribed On
                      </th>
                      <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((subscriber, index) => (
                      <tr
                        key={subscriber._id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-indigo-600">
                                {subscriber.email[0].toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-gray-800">
                              {subscriber.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {formatDate(subscriber.date || subscriber.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => confirmDelete(subscriber)}
                            disabled={deletingId === subscriber._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            {!loading && filtered.length > 0 && (
              <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/30">
                <p className="text-xs text-gray-400">
                  Showing{" "}
                  <span className="font-medium text-gray-600">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-600">
                    {subscribers.length}
                  </span>{" "}
                  subscribers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribersPage;
