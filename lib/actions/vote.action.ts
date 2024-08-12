import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Vote from "../database/models/vote.model";


export const vote = async (candidateName: string, userId: string) => {
  try {
    await connectToDatabase();

    // Check if the user exists
    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      return { success: false, message: "User not found" };
    }

    // Check if the user has already voted
    if (existingUser.votedFor) {
      return { success: false, message: "You have already voted" };
    }

    // Save the vote in the Vote table
    const newVote = new Vote({
      userId,
      candidateName,
    });

    await newVote.save();

    // Update the User table with the candidate they voted for
    existingUser.votedFor = candidateName;
    await existingUser.save();

    return { success: true, message: `You voted for ${candidateName}` };
  } catch (error) {
    console.error("Error recording vote:", error);
    return { success: false, message: "An error occurred while voting" };
  }
};
