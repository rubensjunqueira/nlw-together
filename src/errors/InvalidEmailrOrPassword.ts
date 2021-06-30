import { AppError } from "./AppError";

export class InvalidEmailOrPassword extends AppError {
    constructor(message = 'Email or password invalid!', status = 400){
        super(message, status);
    }
}