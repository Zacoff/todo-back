import { PrismaClient } from '@prisma/client'
import { CreateUserDTO } from '../dtos/UserDTOs/CreateUserDTO'
import { FindUserByIdDTO } from '../dtos/UserDTOs/FindUserDTO'
import { v4 as uuidv4 } from 'uuid'
import crypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { AlreadyExistsError } from '../errors/AlreadyExistsError'
import { NotExistsError } from '../errors/NotExists'

dotenv.config()
const prisma = new PrismaClient()


export class UserServices {
    static async create({email, name, password} : CreateUserDTO) {
        
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) throw new AlreadyExistsError('User');
        
        const passwordHash = await crypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                email: email, 
                name: name,
                password: passwordHash,
                user_id: uuidv4()
            }
        })

        return user
    }
    
    static async delete(user_id : string) {
        await prisma.note.deleteMany({
            where: {
                user_id : user_id
            }
        })

        await prisma.user.delete({
            where : {
                user_id : user_id
            }
        })
    }

    static async findUser({ user_id } : FindUserByIdDTO) {
        const user = await prisma.user.findFirst({
            where: {
                user_id
            }
        });

        if(!user) throw new NotExistsError('User');

        return user
    }

    static async findAll() {
        const users = await prisma.user.findMany();

        if(!users) throw new NotExistsError('Users');

        return users
    }

    static async listNotes({ user_id } : FindUserByIdDTO) {
        const user = await prisma.user.findFirst({
            where: {
                user_id
            },
            include : {
                notes : true
            }
        });

        if(!user) throw new NotExistsError('User');

        if(user.notes.length == 0) throw new NotExistsError('Notes for this user') 

        return user.notes
    }
}