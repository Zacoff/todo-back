import { User as UserPrisma} from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements UserPrisma {

    user_id!: string;

    email!: string;
    
    name!: string;
    
    @Exclude()
    password!: string;
}