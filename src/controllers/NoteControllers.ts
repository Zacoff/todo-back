import { Request, Response, NextFunction} from 'express';
import { CreateNoteDTO } from '../dtos/NoteDTOs/CreateNoteDTO';
import { NoteServices } from '../services/NoteServices';


export class NoteControllers {
    static async create(req : Request, res : Response, next : NextFunction) 
    {
        const {user_id, body, date, title} = req.body as CreateNoteDTO;

        try {
            const noteCreated = await NoteServices.create({user_id, title, body, date });
            return res.status(201).json(noteCreated);   
        } catch (error) {
            next(error)
        }
    }

    static async update(req : Request, res : Response, next : NextFunction) {
        const { id } = req.params;

        const { email, title, body, date } = req.body

        try {
            await NoteServices.update({ id, email, title, body, date });
            
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    static async status(req : Request, res : Response, next : NextFunction) {
        const { id } = req.params;

        const { email, status } = req.body

        try {
            await NoteServices.status({ id, email, status });
            
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}