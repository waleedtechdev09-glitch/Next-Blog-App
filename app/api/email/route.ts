import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import SubscriptionModel from "@/lib/models/EmailModel";

// EMAIL POST
export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    // 1. Get Email from Request Body
    const { email } = await request.json();

    // 2. Basic Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    // 3. Check if email already exists (Avoid Duplicates)
    const exists = await SubscriptionModel.findOne({
      email: email.toLowerCase(),
    });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "You are already subscribed!" },
        { status: 400 },
      );
    }

    // 4. Save to Database
    await SubscriptionModel.create({
      email: email.toLowerCase(),
    });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 201 },
    );
  } catch (error: any) {
    // Catch Mongoose Validation Errors (like Regex failure)
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    console.error("Subscription Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later" },
      { status: 500 },
    );
  }
}

// GET ALL SUBSCRIBED USERS
export async function GET() {
  try {
    await ConnectDB();
    const subscribers = await SubscriptionModel.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// DELETE SUBSCRIBED USERS
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await ConnectDB();

    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber ID is required" },
        { status: 400 },
      );
    }

    // Check if subscriber exists
    const subscriber = await SubscriptionModel.findById(id);
    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 },
      );
    }

    // Delete subscriber
    await SubscriptionModel.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Subscriber deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    // Handle invalid MongoDB ObjectId format
    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, message: "Invalid subscriber ID format" },
        { status: 400 },
      );
    }

    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later" },
      { status: 500 },
    );
  }
}
