import mongoose, { Schema, Document } from 'mongoose';

interface IVote extends Document {
  userId: string;
  candidateName: string;
}

const VoteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  candidateName: { type: String, required: true },
});

const Vote = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);
export default Vote;
