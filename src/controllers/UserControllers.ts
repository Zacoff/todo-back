import { Request, Response, NextFunction} from 'express'
import { CreateUserDTO } from '../dtos/UserDTOs/CreateUserDTO'
import { UserServices } from '../services/UserServices'
import { validationResult } from 'express-validator';
import { ValidationErrors } from '../errors/ValidationErrors';
import { plainToInstance } from 'class-transformer';
import { User } from '../Entities/User';
export class UserControllers {
    static async create(req: Request, res: Response, next: NextFunction) {
        const {email, name, password} = req.body as CreateUserDTO;

        console.log('Creating User');

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw new ValidationErrors(JSON.stringify(errors.array()))

            const userCreated = await UserServices.create({email, name, password});   

            const userTransform = plainToInstance(User, userCreated);

            console.log(`User created: ${userTransform.user_id}`)

            return res.status(201).json(userTransform);

        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const { user_id } = req.body

        console.log('Deleting User')

        try {

            await UserServices.delete(user_id);

            console.log('User delete');
            res.status(200).json({"Message" : "User delete"});

        } catch (error) {
            next(error)
        }

    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        const { user_id } = req.params

        console.log(`Finding for ${user_id}`)

        try {

            const user = await UserServices.findUser({user_id});
            const userTransform = plainToInstance(User, user);

            console.log(`User find : ${user_id}`)
            res.status(200).json(userTransform);

        } catch (error) {
            next(error)
        }

    }

    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {

            const users = await UserServices.findAll();

            const usersTransform = plainToInstance(User, users);

            res.status(200).json(usersTransform);

        } catch (error) {
            next(error)
        }

    }

    static async listNotes(req: Request, res: Response, next: NextFunction) {
        const user_id = req.headers['user-id'];

        try {
            const notes = await UserServices.listNotes({ user_id });
            res.status(200).json(notes)
        } catch (error) {
            next(error)
        }
        
    }
}