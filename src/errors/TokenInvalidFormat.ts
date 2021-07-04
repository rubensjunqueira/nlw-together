import { AppError } from "./AppError";

export class TokenInvalidFormat extends AppError {
    constructor(message = 'Token invalid format!', status = 400) {
        super(message, status);
    }
}