import { Router } from 'express';
import {
  getQuestions,
  createQuestion, // Optional: if you want an endpoint to create questions
} from '../controllers/question.controller';

const router = Router();

router.get('/questions', getQuestions);

// Optional: Route for creating a question (e.g., for seeding or an admin panel)
// To enable, uncomment the line below and ensure createQuestion is imported.
// router.post('/questions', createQuestion);

export default router; 