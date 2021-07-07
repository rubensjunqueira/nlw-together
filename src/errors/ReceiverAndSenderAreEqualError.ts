import { AppError } from './AppError';

export class ReceiverAndSenderAreEqualError extends AppError {
    constructor(
        message = 'Receiver and Sender must be different!',
        status = 400
    ) {
        super(message, status);
    }
}
