import { Request, Response } from 'express';
import { Question } from '../models/question.model';
import { z } from 'zod';

// Zod schema for question creation (optional, for future use or seeding)
const QuestionSchema = z.object({
  questionText: z.string().min(1),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string(),
}).refine(data => data.options.includes(data.correctAnswer), {
  message: "Correct answer must be one of the options",
  path: ["correctAnswer"], // Path to the field that failed validation
});

export const getQuestions = async (req: Request, res: Response) => {
  try {
    // For now, returns all questions. Could be paginated or randomized later.
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Optional: Controller for creating a question (e.g., for seeding or an admin panel)
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const validatedData = QuestionSchema.parse(req.body);
    const newQuestion = new Question(validatedData);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 