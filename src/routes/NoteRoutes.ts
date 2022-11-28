import { Router } from "express";
import { checkSchema } from "express-validator";
import { NoteControllers } from "../controllers/NoteControllers";
import { ValidationCreateNote } from "../validations/ValidationCreateNote";

const noteRouter = Router();

noteRouter
.post('/note/create', checkSchema(new ValidationCreateNote().getValidation()), NoteControllers.create)
.put('/note/status/:id', NoteControllers.status)
.put('/note/update/:id', NoteControllers.update)

export { noteRouter }