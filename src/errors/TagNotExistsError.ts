import { AppError } from "./AppError";

export class TagNotExistsError extends AppError {
    constructor(message = 'Tag does not exists!', status = 400){
        super(message, status);
    }
}