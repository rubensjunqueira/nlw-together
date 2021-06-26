import { AppError } from "./AppError";

export class UserAlreadyExists extends AppError {
    constructor(message: string, status = 400){
        super(message, status);
    }
}