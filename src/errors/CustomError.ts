export class CustomError extends Error {

    errorStatus!: number;

    constructor (what : string) {
        super(what)

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
}