import User from '@/lib/database/models/user.model';

export const vote = async (candidateName: string, clerkId: string) => {
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.votedFor) {
      return { success: false, message: "You have already voted for " + user.votedFor };
    }

    user.votedFor = candidateName;
    await user.save();

    return { success: true, message: "Your vote for " + candidateName + " has been recorded successfully." };
  } catch (error) {
    console.error('Error recording vote:', error);
    return { success: false, message: "An error occurred while voting" };
  }
};
