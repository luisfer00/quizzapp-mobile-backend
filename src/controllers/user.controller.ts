import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';
import { z } from 'zod';

// Zod schema for nickname validation
const NicknameSchema = z.object({
  nickname: z.string().min(3, { message: 'Nickname must be at least 3 characters long' }).trim(),
});

// Zod schema for score update
const ScoreSchema = z.object({
  nickname: z.string().trim(), // or userId if we decide to use IDs post-creation
  score: z.number().int().min(0),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = NicknameSchema.parse(req.body);
    const { nickname } = validatedData;

    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
      return res.status(409).json({ message: 'Nickname already taken' });
    }

    const newUser = new User({ nickname });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.params;
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserScore = async (req: Request, res: Response) => {
  try {
    const validatedData = ScoreSchema.parse(req.body);
    const { nickname, score } = validatedData;

    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update totalScore only if the current game's score is higher
    if (score > user.totalScore) {
      user.totalScore = score;
    }
    // If the score is not higher, user.totalScore remains unchanged.
    // We still save the user to update `updatedAt` timestamp if needed, 
    // or you might decide to only save if totalScore actually changed.
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const topUsers = await User.find().sort({ totalScore: -1 }).limit(10); // Get top 10 users
    res.status(200).json(topUsers);
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 