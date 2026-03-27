import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ConnectDB();
    const { id } = await params;

    // Pehle slug se dhundo, nahi mila to _id se try karo
    let blog = await BlogModel.findOne({ slug: id });

    if (!blog) {
      blog = await BlogModel.findById(id).catch(() => null);
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching blog" },
      { status: 500 },
    );
  }
}
