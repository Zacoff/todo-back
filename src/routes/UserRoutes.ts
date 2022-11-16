import { Router } from "express";
import { UserControllers } from "../controllers/UserControllers";
import {checkSchema, body as field} from 'express-validator';
import { ValidationCreateUser } from "../validations/ValidationCreateUser";

const userRouter = Router();

//TODO
// terminar validações nas rotas
// criar rota de login
// CRIAR midlleware de autenticação para login

userRouter
.post('/user/create', checkSchema(new ValidationCreateUser().getValidation()),UserControllers.create)
.get('/user/find/:email', UserControllers.findById)
.get('/user/list', UserControllers.findAll)
.get('/user/notes', UserControllers.listNotes)
.delete('/user/delete', UserControllers.delete)

export { userRouter }