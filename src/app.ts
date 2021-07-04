import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import connect from './database';
import './container';
import routes from './routes';
import { AppError } from './errors/AppError';

connect();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.status).json({
            error: error.message
        });
    }
    return res.status(500).json({
        status: "error",
        error: `Internal Server error: ${error}`
    })
});

export { app };