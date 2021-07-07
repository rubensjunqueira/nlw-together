import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', status = 401) {
        super(message, status);
    }
}
