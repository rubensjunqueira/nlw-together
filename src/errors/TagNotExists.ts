import { AppError } from "./AppError";

export class TagNotExists extends AppError {
    constructor(message = 'Tag does not exists!', status = 400){
        super(message, status);
    }
}