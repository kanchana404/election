import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  vote: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
