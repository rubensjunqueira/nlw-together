import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Auth } from "../config/Auth";
import { AppError } from "../errors/AppError";
import { TokenInvalidFormat } from "../errors/TokenInvalidFormat";
import { TokenIsMissingError } from "../errors/TokenIsMissingError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) throw new TokenIsMissingError();

    const [, token] = authToken.split(' ');

    if (!token) throw new TokenInvalidFormat();

    try {
        const { sub } = verify(token, Auth.secret) as IPayload;

        req.user_id = sub;

        return next();
    } catch (err) {
        throw new AppError(err.message, 401);
    }
}