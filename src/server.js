// src/server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notesRoutes } from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 3000;

export const setupServer = async () => {
  // Спочатку підключаємося до бази даних, а потім запускаємо сервер
  await connectMongoDB();

  const app = express();

  // Middleware
  app.use(logger);
  app.use(express.json());
  app.use(cors());

  // Маршрути
  app.use('/notes', notesRoutes);

  // Обробка неіснуючих маршрутів (404)
  app.use(notFoundHandler);

  // Глобальний обробник помилок (повинен бути останнім!)
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
