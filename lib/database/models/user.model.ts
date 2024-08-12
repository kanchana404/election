import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  vote: { type: Boolean, default: false }, // Added vote field
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;
