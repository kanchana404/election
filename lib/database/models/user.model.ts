import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  votedFor?: string;  // Field to store the candidate the user voted for
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String },
  votedFor: { type: String, default: null },  // Default is null, meaning the user hasn't voted yet
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
