import mongoose from "mongoose";

// Email Regex: Checks for standard format (something@domain.com)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Automatically converts "User@Mail.com" to "user@mail.com"
      trim: true, // Removes accidental spaces before or after the email
      match: [emailRegex, "Please provide a valid email address"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Check if the model already exists to prevent Next.js hot-reload errors
const SubscriptionModel =
  mongoose.models.subscription ||
  mongoose.model("subscription", SubscriptionSchema);

export default SubscriptionModel;
