import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import 'express-async-errors';
import connect from './database';
import './container';
import { AppError } from './errors/AppError';
import routes from './routes';
import swaggerFile from './swagger.json';

connect();
const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.status).json({
            error: error.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        error: `Internal Server error: ${error}`,
    });
});

export { app };
