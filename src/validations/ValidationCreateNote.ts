import { Schema } from "express-validator";

export class ValidationCreateNote {
    
    validation: Schema;

    constructor() {
        this.validation = {
            user_id : {
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
                }
            },
            title : {
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
                }
            },
            body : {
                notEmpty: {
                    options: {
                        ignore_whitespace: true
                    }
                }
            },
            date : {
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