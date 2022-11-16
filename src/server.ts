import express, {Request, Response, NextFunction} from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/UserRoutes';
import cors from 'cors';
import { CustomError } from './errors/CustomError';
import { noteRouter } from './routes/NoteRoutes';
import { ValidationErrors } from './errors/ValidationErrors';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  methods : 'GET,OPTIONS,PUT,POST,DELETE',
  origin : '*'
}));

app.use(express.json());

app.use(userRouter);

app.use(noteRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError && err instanceof ValidationErrors) {
        return res.status(err.errorStatus).json({'Validation Errors' : JSON.parse(err.getErrorMessage())})
    }else if(err instanceof CustomError) {
        return res.status(err.errorStatus).json({message: err.getErrorMessage()})
    }
    console.log(err)
      res.status(500).json({status: 'error' , message: "Internal Server Error"})
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
})
