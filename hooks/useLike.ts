import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useLike = (blogId: string, initialLikes: number) => {
  const storageKey = `liked_${blogId}`;

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false); // default false, useEffect mein set hoga
  const [loading, setLoading] = useState(false);

  // Client side pe localStorage check karo
  useEffect(() => {
    const alreadyLiked = localStorage.getItem(storageKey) === "true";
    setLiked(alreadyLiked);
  }, [storageKey]);

  const handleLike = async () => {
    if (liked) {
      toast.info("You already liked this post!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/blog/like/${blogId}`);

      if (res.data.success) {
        setLikes(res.data.likes); // DB se updated count
        setLiked(true);
        localStorage.setItem(storageKey, "true");
        toast.success("You liked this post! ❤️");
      }
    } catch {
      toast.error("Failed to like. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { likes, liked, loading, handleLike };
};
