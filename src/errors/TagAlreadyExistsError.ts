import { AppError } from "./AppError";

export class TagAlreadyExistsError extends AppError {
    constructor(message: string, status = 400) {
        super(message, status);
    }
}