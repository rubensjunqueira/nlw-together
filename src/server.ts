import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal Server error: ${error}`
    })
});

app.listen(3000, () =>  console.log('Server is Running!'));