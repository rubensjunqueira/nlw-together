import { Router } from 'express';
import { CreateComplimentController } from '../controllers/Compliments/CreateComplimentController';
const complimentsRoutes = Router();

const createComplimentController = new CreateComplimentController();

complimentsRoutes.post('/', createComplimentController.handle);

export default complimentsRoutes;