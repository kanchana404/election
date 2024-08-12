import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  votedFor: { type: String, default: null }, // This field will store the candidate's name
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
