import express, {Request, Response, NextFunction} from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/UserRoutes';
import cors from 'cors';
import { CustomError } from './errors/CustomError';
import { noteRouter } from './routes/NoteRoutes';
import { ValidationErrors } from './errors/ValidationErrors';
import { PrismaClient } from '@prisma/client';
import { ErrorMiddleware } from './middlewares/ErrorsMiddleware';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  methods : 'GET,OPTIONS,PUT,POST,DELETE',
  origin : '*'
}));

app.use(express.json());

try {
  
  initDB()

  app.use(userRouter);

  app.use(noteRouter);
  
  app.use(ErrorMiddleware.get);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
  })   

} catch (error) {
  
}

async function initDB() {
  const prisma = new PrismaClient()

  await prisma.$connect()
}