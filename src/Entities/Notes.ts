import { Note as NotePrisma} from '@prisma/client';

export class Note implements NotePrisma {
    note_id!: number;
    user_id!: string;
    body!: string;
    date!: string;
    check!: boolean;
    title!: string;
}