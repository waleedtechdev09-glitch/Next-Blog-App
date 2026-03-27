import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [2, "Comment too short"],
      maxlength: [500, "Comment too long"],
    },
  },
  { timestamps: true },
);

const CommentModel =
  mongoose.models.comment || mongoose.model("comment", CommentSchema);

export default CommentModel;
