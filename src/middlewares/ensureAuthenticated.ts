import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Auth } from "../config/Auth";
import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) throw new AppError('Token is missing!', 401);

    const [, token] = authToken.split(' ');

    if (!token) throw new AppError('Token invalid format!');

    try {
        const { sub } = verify(token, Auth.secret) as IPayload;

        req.user_id = sub;

        return next();
    } catch (err) {
        throw new AppError(err.message, 401);
    }
}