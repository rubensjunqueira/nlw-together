import { AppError } from "./AppError";

export class UserDoesNotExistsError extends AppError {
    constructor(message = 'User does not exists!', status = 400) {
        super(message, status);
    }
}