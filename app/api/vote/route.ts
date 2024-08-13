// app/api/vote/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Vote from "@/lib/database/models/vote.model";

export async function POST(req: Request) {
  await connectToDatabase();
  const { userId, candidateName } = await req.json();

  try {
    const existingVote = await Vote.findOne({ userId });
    if (existingVote) {
      return NextResponse.json(
        { success: false, message: "You have already voted" },
        { status: 400 }
      );
    }

    const vote = new Vote({
      userId,
      candidateName,
    });
    await vote.save();

    return NextResponse.json({ success: true, message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json({ success: false, message: "Failed to record vote" }, { status: 500 });
  }
}
