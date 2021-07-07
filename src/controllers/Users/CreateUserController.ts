import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../../services/Users/CreateUserService';

export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password, admin } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const createdUser = await createUserService.execute({
            name,
            email,
            password,
            admin,
        });

        return res.status(201).json(createdUser);
    }
}
