import {Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/CustomError';
import { ValidationErrors } from '../errors/ValidationErrors';


export class ErrorMiddleware {
    static get(err: Error, req: Request, res: Response, next: NextFunction) {
        if(err instanceof CustomError && err instanceof ValidationErrors) {
          console.log(`Validation Errors : ${err.getErrorMessage()}`)
          return res.status(err.errorStatus).json({'Validation Errors' : JSON.parse(err.getErrorMessage())})
        }
  
        if(err instanceof CustomError) {
          console.log(err.getErrorMessage())
          return res.status(err.errorStatus).json({message: err.getErrorMessage()})
        }
          console.log(err)
          res.status(500).json({status: 'error' , message: "Internal Server Error"})
      }
}