import User from '@/lib/database/models/user.model';
import { connectToDatabase } from '@/lib/database';

export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}
