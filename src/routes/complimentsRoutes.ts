import { Router } from 'express';

import { CreateComplimentController } from '../controllers/Compliments/CreateComplimentController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const complimentsRoutes = Router();

const createComplimentController = new CreateComplimentController();

complimentsRoutes.post(
    '/',
    ensureAuthenticated,
    createComplimentController.handle
);

export default complimentsRoutes;
