import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Description must be at least 3 characters"],
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      minlength: [3, "Author should have at least 3 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default BlogModel;
