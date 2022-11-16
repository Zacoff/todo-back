import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { CreateNoteDTO } from '../dtos/NoteDTOs/CreateNoteDTO'
import { StatusNoteDTO } from '../dtos/NoteDTOs/StatusNoteDTO'
import { UpdateNoteDTO } from '../dtos/NoteDTOs/UpdateNoteDTO'
import { NotExistsError } from '../errors/NotExists'

dotenv.config()
const prisma = new PrismaClient()

export class NoteServices {
    static async create({user_id, title, body, date} : CreateNoteDTO) {
        const user = await prisma.user.findUnique({
            where: {
                user_id: user_id
            }
        })

        if(!user) throw new NotExistsError('User');

        

        const noteCreated = await prisma.note.create({
            data: {
                title : title,
                body : body,
                date: date,
                author: {
                    connect : {
                        user_id : user_id
                    }
                }
            },
            include: {
                author: true
            }
        })

        return noteCreated
    }
    static async update({ id, email, title, body, date } : UpdateNoteDTO) {
        
        let note_id = parseInt(id) as number;

        await prisma.user.update({
            where: {
                email : email
            },
            data: {
                notes : {
                    update : {
                        where : {
                            note_id : note_id
                        },
                        data : {
                            title : title,
                            body : body,
                            date : date
                        }
                    }
                }
            }
        })
    
    }

    static async status({ id, email, status } : StatusNoteDTO) {
        
        let note_id = parseInt(id) as number;

        await prisma.user.update({
            where: {
                email : email
            },
            data: {
                notes : {
                    update : {
                        where : {
                            note_id : note_id
                        },
                        data : {
                            check : status
                        }
                    }
                }
            }
        })
    
    }

}