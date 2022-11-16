import { CustomError } from "./CustomError";

export class ValidationErrors extends CustomError {

    errorStatus: number = 400;

    constructor (what : string) {
        super(what)

        Object.setPrototypeOf(this, ValidationErrors.prototype);
    }

    getErrorMessage() {
        return this.message
    }
}