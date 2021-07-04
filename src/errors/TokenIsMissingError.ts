import { AppError } from "./AppError";

export class TokenIsMissingError extends AppError {
    constructor(message = 'Token is missing!', status = 401) {
        super(message, status);
    }
}