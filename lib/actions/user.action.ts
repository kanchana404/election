import User from '@/lib/database/models/user.model';

export async function createUser(userData: {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  vote: boolean;
}) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function updateUser(clerkId: string, updateData: {
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}) {
  try {
    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}
