import { Router } from "express";
import { NoteControllers } from "../controllers/NoteControllers";


const noteRouter = Router();

noteRouter
.post('/note/create', NoteControllers.create)
.put('/note/status/:id', NoteControllers.status)
.put('/note/update/:id', NoteControllers.update)

export { noteRouter }