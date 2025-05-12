import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question, IQuestion } from '../models/question.model'; // Adjust path as necessary

dotenv.config({ path: '../../.env' }); // Load .env from the root of the 'back' project

const sampleQuestions: Partial<IQuestion>[] = [
  // First set of Spanish questions
  {
    questionText: '¿Cuál es el río más largo del mundo?',
    options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
    correctAnswer: 'Amazonas',
  },
  {
    questionText: '¿Quién pintó "La noche estrellada"?',
    options: ['Pablo Picasso', 'Salvador Dalí', 'Vincent van Gogh', 'Claude Monet'],
    correctAnswer: 'Vincent van Gogh',
  },
  {
    questionText: '¿En qué año llegó el hombre a la Luna por primera vez?',
    options: ['1965', '1969', '1972', '1958'],
    correctAnswer: '1969',
  },
  {
    questionText: '¿Cuál es el metal más conductor de electricidad?',
    options: ['Oro', 'Hierro', 'Plata', 'Cobre'],
    correctAnswer: 'Plata',
  },
  {
    questionText: '¿Qué planeta es conocido como "el planeta rojo"?',
    options: ['Venus', 'Júpiter', 'Marte', 'Saturno'],
    correctAnswer: 'Marte',
  },
  {
    questionText: '¿Cuál es el hueso más pequeño del cuerpo humano?',
    options: ['Estribo', 'Falange', 'Martillo', 'Yunque'], // Assuming the previous 'Estribo (en el oído)' was simplified to 'Estribo' by user
    correctAnswer: 'Estribo',
  },
  {
    questionText: '¿Qué escritor creó "Don Quijote de la Mancha"?',
    options: ['Gabriel García Márquez', 'Federico García Lorca', 'Miguel de Cervantes', 'Pablo Neruda'],
    correctAnswer: 'Miguel de Cervantes',
  },
  {
    questionText: '¿Cuál es el país más grande del mundo en extensión territorial?',
    options: ['China', 'Canadá', 'Rusia', 'Estados Unidos'],
    correctAnswer: 'Rusia',
  },
  {
    questionText: '¿Qué elemento químico tiene el símbolo "O"?',
    options: ['Oro', 'Osmio', 'Oxígeno', 'Oro'],
    correctAnswer: 'Oxígeno',
  },
  {
    questionText: '¿En qué continente se encuentra Egipto?',
    options: ['Asia', 'África', 'Europa', 'América'],
    correctAnswer: 'África',
  },
  // New batch of Spanish questions (11-20)
  {
    questionText: '¿Cuál es la montaña más alta del mundo?',
    options: ['Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    correctAnswer: 'Everest',
  },
  {
    questionText: '¿Quién descubrió América en 1492?',
    options: ['Cristóbal Colón', 'Hernán Cortés', 'Fernando de Magallanes', 'Vasco da Gama'],
    correctAnswer: 'Cristóbal Colón',
  },
  {
    questionText: '¿Cuál es el material natural más duro?',
    options: ['Diamante', 'Grafeno', 'Cuarzo', 'Acero'],
    correctAnswer: 'Diamante',
  },
  {
    questionText: '¿Quién escribió "Cien años de soledad"?',
    options: ['Gabriel García Márquez', 'Pablo Neruda', 'Julio Cortázar', 'Jorge Luis Borges'],
    correctAnswer: 'Gabriel García Márquez',
  },
  {
    questionText: '¿Quién pintó "La Gioconda"?',
    options: ['Leonardo da Vinci', 'Miguel Ángel', 'Rafael', 'Donatello'],
    correctAnswer: 'Leonardo da Vinci',
  },
  {
    questionText: '¿Cuál es el símbolo químico del oro?',
    options: ['Au', 'Ag', 'Fe', 'Cu'],
    correctAnswer: 'Au',
  },
  {
    questionText: '¿Cuál es la capital de Australia?',
    options: ['Sídney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 'Canberra',
  },
  {
    questionText: '¿Cuál es el órgano más grande del cuerpo humano?',
    options: ['Piel', 'Hígado', 'Corazón', 'Cerebro'],
    correctAnswer: 'Piel',
  },
  {
    questionText: '¿En qué año terminó la Segunda Guerra Mundial?',
    options: ['1945', '1944', '1946', '1950'],
    correctAnswer: '1945',
  },
  {
    questionText: '¿Cuál es la estrella más cercana a la Tierra?',
    options: ['El Sol', 'Alpha Centauri', 'Sirio', 'Betelgeuse'],
    correctAnswer: 'El Sol',
  },
];

const seedDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not defined in your .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Successfully connected to MongoDB for seeding.');

    // Clear existing questions
    console.log('Clearing existing questions...');
    await Question.deleteMany({});
    console.log('Existing questions cleared.');

    // Insert new questions
    console.log('Inserting sample questions...');
    await Question.insertMany(sampleQuestions);
    console.log(`${sampleQuestions.length} questions have been successfully inserted.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Ensure the connection is closed
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
};

seedDatabase(); 