import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const admin = false;

    if (!admin) throw new AppError('Unauthorized', 401);

    return next();
}