import { NextRequest, NextResponse } from "next/server";
import Vote from "@/lib/database/models/vote.model";
import { connectToDatabase } from "@/lib/database";

// Updated candidate names including Wijedasa Rajapaksa
const candidates = [
  "Anura Kumara",
  "Ranil Wickremesinghe",
  "Sajith Premadasa",
  "Namal Rajapaksa",
  "Wijedasa Rajapaksa"
];

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    // Aggregate votes for each candidate
    const voteCounts = await Vote.aggregate([
      { $group: { _id: "$candidateName", count: { $sum: 1 } } }
    ]);

    // Convert the aggregation result to an object with candidate names as keys
    const voteCountsMap = voteCounts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {} as Record<string, number>);

    // Add all candidates to the response, including those with 0 votes
    const allCandidates = candidates.map((candidate) => ({
      candidateName: candidate,
      count: voteCountsMap[candidate] || 0,
    }));

    return NextResponse.json(allCandidates, { status: 200 });
  } catch (error) {
    console.error("Error fetching vote counts:", error);
    return NextResponse.json({ error: "Failed to fetch vote counts" }, { status: 500 });
  }
}
