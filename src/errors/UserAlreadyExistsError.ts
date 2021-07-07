import { AppError } from './AppError';

export class UserAlreadyExistsError extends AppError {
    constructor(message: string, status = 400) {
        super(message, status);
    }
}
