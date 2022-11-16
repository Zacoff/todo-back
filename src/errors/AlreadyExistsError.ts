import { CustomError } from "./CustomError";

export class AlreadyExistsError extends CustomError {

    errorStatus: number = 409;

    constructor (what : string) {
        super(what)

        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }

    getErrorMessage() {
        return 'Already exists: ' + this.message
    }
}