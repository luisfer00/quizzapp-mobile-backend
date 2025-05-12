import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import questionRoutes from './routes/question.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

// API Routes
app.use('/api', userRoutes);
app.use('/api', questionRoutes);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Quiz App Backend API is running!');
}); 