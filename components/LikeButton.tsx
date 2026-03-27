"use client";

import { Heart, Loader2 } from "lucide-react";
import { useLike } from "@/hooks/useLike";

interface Props {
  blogId: string;
  initialLikes: number;
}

const LikeButton = ({ blogId, initialLikes }: Props) => {
  const { likes, liked, loading, handleLike } = useLike(blogId, initialLikes);

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 active:scale-95
        ${
          liked
            ? "bg-red-50 text-red-500 border-red-200"
            : "bg-white text-gray-400 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        }`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Heart
          className="w-3.5 h-3.5 transition-all duration-200"
          fill={liked ? "currentColor" : "none"}
          strokeWidth={2}
        />
      )}
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
