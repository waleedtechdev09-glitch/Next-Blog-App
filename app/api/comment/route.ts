import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import CommentModel from "@/lib/models/CommentModel";

// GET — blogId se comments fetch karo
export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const blogId = req.nextUrl.searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { success: false, message: "blogId is required" },
        { status: 400 },
      );
    }

    const comments = await CommentModel.find({ blogId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, comments }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// POST — naya comment save karo
export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const { blogId, comment } = await req.json();

    if (!blogId || !comment) {
      return NextResponse.json(
        { success: false, message: "blogId and comment are required" },
        { status: 400 },
      );
    }

    const newComment = await CommentModel.create({ blogId, comment });

    return NextResponse.json(
      { success: true, comment: newComment },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
