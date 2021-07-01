import { AppError } from "./AppError";

export class ReceiverNotExists extends AppError {
    constructor(message = 'User receiver does not exists!', status = 400){
        super(message, status);
    }
}