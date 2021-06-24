import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/Users/AuthenticateUseService";

export class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const authenticatedUser = await authenticateUserService.execute({
            email,
            password
        });

        return res.status(200).json(authenticatedUser);
    }
}