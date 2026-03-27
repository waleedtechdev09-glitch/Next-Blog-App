import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface BlogItemProps {
  id: string; // ✅ number se string — MongoDB _id string hoti hai
  title: string;
  desc: string;
  image: string;
  category: string;
}

const BlogItem: React.FC<BlogItemProps> = ({
  id,
  title,
  desc,
  image,
  category,
}) => {
  return (
    <Link href={`/blog/${id}`} className="group block h-full">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
        {/* Image — next/image ki jagah img tag */}
        <div className="relative w-full h-44 overflow-hidden shrink-0 bg-gray-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-white text-gray-700 rounded-full border border-gray-100 shadow-sm">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 bg-white">
          <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
            {desc}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <span className="text-xs font-medium text-gray-400">
              Read Article
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
