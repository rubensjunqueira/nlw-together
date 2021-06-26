import { AppError } from "./AppError";

export class EmailInvalidError extends AppError {
    constructor(message: string, status = 400){
        super(message, status);
    }
}