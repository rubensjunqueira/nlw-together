import { AppError } from './AppError';

export class ReceiverNotExistsError extends AppError {
    constructor(message = 'User receiver does not exists!', status = 400) {
        super(message, status);
    }
}
