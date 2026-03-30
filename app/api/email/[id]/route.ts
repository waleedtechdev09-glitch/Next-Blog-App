import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import SubscriptionModel from "@/lib/models/EmailModel";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ConnectDB();

    const { id } = await params;

    const subscriber = await SubscriptionModel.findByIdAndDelete(id);

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
