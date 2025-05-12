import { Schema, model, Document } from 'mongoose';

export interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const questionSchema = new Schema<IQuestion>(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: [
        (val: string[]) => val.length === 4,
        'Options array must contain exactly 4 strings',
      ],
    },
    correctAnswer: {
      type: String,
      required: true,
      // We can add a custom validator to ensure correctAnswer is one of the options
      validate: {
        validator: function (this: IQuestion, value: string) {
          return this.options.includes(value);
        },
        message: 'Correct answer must be one of the options',
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export const Question = model<IQuestion>('Question', questionSchema); 