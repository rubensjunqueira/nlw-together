import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/User/typeorm/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req;

    const usersRepository = getCustomRepository(UsersRepository);

    const { admin } = await usersRepository.findOne(user_id);

    if (!admin) throw new AppError('Unauthorized', 401);

    return next();
}