import { CustomError } from "./CustomError";

export class NotExistsError extends CustomError {

    errorStatus: number = 404;

    constructor (what : string) {
        super(what)

        Object.setPrototypeOf(this, NotExistsError.prototype);
    }

    getErrorMessage() {
        return 'Not Exists: ' + this.message
    }
}