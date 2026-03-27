import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import SubscriptionModel from "@/lib/models/EmailModel";

// 1. Define the type for the dynamic params
type Params = Promise<{ id: string }>;

// --- EMAIL POST ---
export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const exists = await SubscriptionModel.findOne({
      email: email.toLowerCase(),
    });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "You are already subscribed!" },
        { status: 400 },
      );
    }

    await SubscriptionModel.create({
      email: email.toLowerCase(),
    });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 201 },
    );
  } catch (error: any) {
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

// --- GET ALL SUBSCRIBED USERS ---
export async function GET() {
  try {
    await ConnectDB();
    const subscribers = await SubscriptionModel.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// --- DELETE SUBSCRIBED USERS ---
// export async function DELETE(
//   _req: NextRequest,
//   segmentData: { params: Params }, // Next.js 15+ expects params to be a Promise
// ) {
//   try {
//     await ConnectDB();

//     // In Next.js 15, params must be awaited
//     const { id } = await segmentData.params;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Subscriber ID is required" },
//         { status: 400 },
//       );
//     }

//     // Check if subscriber exists and delete
//     const subscriber = await SubscriptionModel.findByIdAndDelete(id);

//     if (!subscriber) {
//       return NextResponse.json(
//         { success: false, message: "Subscriber not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Subscriber deleted successfully" },
//       { status: 200 },
//     );
//   } catch (error: any) {
//     if (error.name === "CastError") {
//       return NextResponse.json(
//         { success: false, message: "Invalid subscriber ID format" },
//         { status: 400 },
//       );
//     }

//     console.error("Delete Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error, please try again later" },
//       { status: 500 },
//     );
//   }
// }

// DELETE SUBSCRIBED USERS
export async function DELETE(request: NextRequest) {
  try {
    await ConnectDB();

    // Look for ?id=... in the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber ID is required" },
        { status: 400 },
      );
    }

    const subscriber = await SubscriptionModel.findByIdAndDelete(id);

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Subscriber deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.name === "CastError") {
      return NextResponse.json(
        { success: false, message: "Invalid subscriber ID format" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
