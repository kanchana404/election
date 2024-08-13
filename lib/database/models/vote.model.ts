import mongoose, { Schema, model, models } from 'mongoose';

const voteSchema = new Schema({
  userId: {
    type: String, // Must be String, not ObjectId
    required: true,
    unique: true, // To ensure a user can only vote once
  },
  candidateName: {
    type: String,
    required: true,
  },
});

const Vote = models.Vote || model('Vote', voteSchema);

export default Vote;
