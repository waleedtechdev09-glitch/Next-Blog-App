import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ConnectDB();

    const { id } = await params; // ← await add karo

    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { returnDocument: "after" }, // ← deprecated warning bhi fix
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, likes: blog.likes },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
