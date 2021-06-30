import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/User/typeorm/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req;

    const usersRepository = new UsersRepository();

    const { admin } = await usersRepository.find(user_id);

    if (!admin) throw new AppError('Unauthorized', 401);

    return next();
}