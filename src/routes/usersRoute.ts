import { Router } from 'express';
const usersRoutes = Router();

import { CreateUserController } from '../controllers/CreateUserController';

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

export default usersRoutes;