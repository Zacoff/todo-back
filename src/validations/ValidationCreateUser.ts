import { Schema } from "express-validator";

export class ValidationCreateUser {
    
    validation: Schema;

    constructor() {
        this.validation = {
            email: {
                isEmail : {
                    errorMessage: 'Invalid Email', 
                },
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
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
                },
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
                }
            }

        }
    }

    getValidation() {
        return this.validation
    }
}