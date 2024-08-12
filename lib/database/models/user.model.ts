import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  votedFor?: string; // The name of the candidate the user voted for
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  votedFor: { type: String, default: null }, // This field stores the name of the voted candidate
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
