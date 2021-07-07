import { AppError } from './AppError';

export class InvalidTagNameError extends AppError {
    constructor(message = 'Name must not be empty!', status = 400) {
        super(message, status);
    }
}
