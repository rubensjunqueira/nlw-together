import { AppError } from './AppError';

export class EmailInvalidError extends AppError {
    constructor(message = 'Email Incorrect!', status = 400) {
        super(message, status);
    }
}
