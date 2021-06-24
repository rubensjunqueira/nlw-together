import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/Users/AuthenticateUserController';
const usersRoutes = Router();

import { CreateUserController } from '../controllers/Users/CreateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);

export default usersRoutes;