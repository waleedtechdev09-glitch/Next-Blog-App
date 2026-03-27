"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MessageCircle, Send, Loader2 } from "lucide-react";

interface Comment {
  _id: string;
  comment: string;
  createdAt: string;
}

interface Props {
  blogId: string;
}

const CommentSection = ({ blogId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Comments fetch karo
  const fetchComments = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`/api/comment?blogId=${blogId}`);
      setComments(res.data.comments || []);
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // Comment submit karo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.warning("Please write a comment first");
      return;
    }
    if (text.trim().length < 2) {
      toast.warning("Comment is too short");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/comment", {
        blogId,
        comment: text.trim(),
      });

      if (res.data.success) {
        setComments((prev) => [res.data.comment, ...prev]); // top pe add karo
        setText("");
        toast.success("Comment posted! 💬");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to post comment";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-bold text-gray-900">
          Comments{" "}
          <span className="text-sm font-normal text-gray-400">
            ({comments.length})
          </span>
        </h2>
      </div>

      {/* Comment Input Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div
          className={`flex gap-3 p-1.5 bg-white border rounded-2xl shadow-sm transition-all
          ${text ? "border-gray-300 ring-4 ring-gray-50" : "border-gray-200"}`}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={2}
            maxLength={500}
            className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none resize-none bg-transparent rounded-xl"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="self-end mb-1.5 mr-1.5 px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Post
          </button>
        </div>
        {/* Char counter */}
        <p className="text-right text-xs text-gray-300 mt-1.5 pr-2">
          {text.length}/500
        </p>
      </form>

      {/* Comments List */}
      {fetching ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-8 h-8 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No comments yet.</p>
          <p className="text-xs text-gray-300 mt-1">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-gray-200 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                {/* Anonymous Avatar */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">A</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Anonymous
                  </span>
                </div>
                <span className="text-xs text-gray-300">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {c.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
