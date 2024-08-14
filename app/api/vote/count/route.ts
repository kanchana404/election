import { NextRequest, NextResponse } from "next/server";
import Vote from "@/lib/database/models/vote.model";
import { connectToDatabase } from "@/lib/database";

// Example candidate names
const candidates = ["Anura Kumara", "Ranil Wickremesinghe", "Sajith Premadasa", "Namal Rajapaksa", "Wijedasa Rajapaksa"];

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

    const response = NextResponse.json(allCandidates, { status: 200 });
    
    // Set headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    console.error("Error fetching vote counts:", error);
    return NextResponse.json({ error: "Failed to fetch vote counts" }, { status: 500 });
  }
}
