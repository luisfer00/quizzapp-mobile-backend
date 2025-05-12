import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  nickname: string;
  totalScore: number;
}

const userSchema = new Schema<IUser>(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export const User = model<IUser>('User', userSchema); 