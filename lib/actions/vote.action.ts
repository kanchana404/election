import { connectToDatabase } from "../database";
import voteModel from "../database/models/vote.model";
import Vote from "@/lib/database/models/vote.model";



export const vote = async (candidateName: string, userId: string) => {
  try {
    await connectToDatabase();

    // Check if the user has already voted
    const existingVote = await voteModel.findOne({ userId });

    if (existingVote) {
      return { success: false, message: "You have already voted." };
    }

    // Create a new vote record
    const newVote = new Vote({
      userId,
      candidateName,
    });

    await newVote.save();

    return { success: true, message: `Your vote for ${candidateName} has been recorded.` };
  } catch (error) {
    console.error("Error voting:", error);
    return { success: false, message: "An error occurred while voting." };
  }
};
