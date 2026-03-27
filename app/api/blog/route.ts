import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (file: File, folder: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
};

// GET ALL BLOGS
export async function GET() {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}

// POST A BLOG
export async function POST(request: NextRequest) {
  try {
    await ConnectDB();
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const image = formData.get("image") as File;
    const authorImage = formData.get("authorImage") as File;

    if (
      !title ||
      !description ||
      !category ||
      !author ||
      !image ||
      !authorImage
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    // --- Cloudinary Uploads ---
    const imageUpload: any = await uploadToCloudinary(image, "blog_images");
    const authorImageUpload: any = await uploadToCloudinary(
      authorImage,
      "author_images",
    );

    // --- Slug generation ---
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await BlogModel.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const newBlog = await BlogModel.create({
      title,
      description,
      category,
      author,
      likes: 0,
      slug,
      image: imageUpload.secure_url, // Cloudinary URL
      authorImage: authorImageUpload.secure_url, // Cloudinary URL
    });

    return NextResponse.json(
      { success: true, message: "Blog created successfully", blog: newBlog },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE A BLOG
export async function DELETE(request: NextRequest) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { success: false, message: "ID required" },
        { status: 400 },
      );

    // Note: Cloudinary se delete karne ke liye public_id chahiye hoti hai.
    // Filhal hum sirf DB se record delete kar rahe hain.
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
