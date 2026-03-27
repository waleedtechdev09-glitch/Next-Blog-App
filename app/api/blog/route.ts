import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import slugify from "slugify";

// GET ALL BLOGS
export async function GET() {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (
      !allowedTypes.includes(image.type) ||
      !allowedTypes.includes(authorImage.type)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPEG, PNG, and WebP images are allowed",
        },
        { status: 400 },
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();

    const imageExt = image.type.split("/")[1];
    const imageName = `blog_${timestamp}.${imageExt}`;
    const imageBytes = await image.arrayBuffer();
    await writeFile(path.join(uploadDir, imageName), Buffer.from(imageBytes));

    const authorImageExt = authorImage.type.split("/")[1];
    const authorImageName = `author_${timestamp}.${authorImageExt}`;
    const authorImageBytes = await authorImage.arrayBuffer();
    await writeFile(
      path.join(uploadDir, authorImageName),
      Buffer.from(authorImageBytes),
    );

    // ── Slug generation ──────────────────────────────
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // Duplicate slug check
    while (await BlogModel.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }
    // ────────────────────────────────────────────────────

    const newBlog = await BlogModel.create({
      title,
      description,
      category,
      author,
      likes: 0,
      slug,
      image: `/uploads/${imageName}`,
      authorImage: `/uploads/${authorImageName}`,
    });

    return NextResponse.json(
      { success: true, message: "Blog created successfully", blog: newBlog },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 },
      );
    }

    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
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

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 },
      );
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    const imagePath = path.join(process.cwd(), "public", blog.image);
    const authorImgPath = path.join(process.cwd(), "public", blog.authorImage);

    await unlink(imagePath).catch(() => console.log("Blog image already gone"));
    await unlink(authorImgPath).catch(() =>
      console.log("Author image already gone"),
    );

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
