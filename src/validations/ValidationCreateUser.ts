import { Schema } from "express-validator";

export class ValidationCreateUser {
    
    validation: Schema;

    constructor() {
        this.validation = {
            email: {
                isEmail : {
                    errorMessage: 'Invalid Email', 
                }
            },

            name: {
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
                }
            },

            password: {
                isLength : {
                    options: {
                        max: 12,
                        min: 8
                    }
                }
            }

        }
    }

    getValidation() {
        return this.validation
    }
}