import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersService } from '../../services/Users/ListUsersService';

export class ListUsersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listUsersService = container.resolve(ListUsersService);

        const users = await listUsersService.execute();

        return res.status(users.length > 0 ? 200 : 204).json(users);
    }
}
