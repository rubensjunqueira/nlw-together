import { Response, Request } from "express";
import { CreateUserService } from "../services/Users/CreateUserService";

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password, admin } = req.body;

        const createUserService = new CreateUserService();

        const createdUser = await createUserService.execute({
            name,
            email,
            password,
            admin
        });

        return res.status(201).json(createdUser);
    }
}