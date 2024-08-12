import { connectToDatabase } from "../database";
import Vote from "../database/models/vote.model";


export const vote = async (candidateName: string, userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ userId });

    if (existingVote) {
      return { success: false, message: "You have already voted" };
    }

    // Create a new vote entry
    const newVote = new Vote({
      userId,
      candidateName,
    });

    await newVote.save();

    return { success: true, message: `You voted for ${candidateName}` };
  } catch (error) {
    console.error("Error recording vote:", error);
    return { success: false, message: "An error occurred while voting" };
  }
};
