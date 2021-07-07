import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserDoesNotExistsError } from '../errors/UserDoesNotExistsError';
import { UsersRepository } from '../repositories/User/typeorm/UsersRepository';

export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { user_id } = req;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.find(user_id);

    if (!user) throw new UserDoesNotExistsError();

    if (!user.admin) throw new UnauthorizedError();

    return next();
}
