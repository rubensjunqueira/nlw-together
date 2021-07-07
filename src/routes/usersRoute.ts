import { Router } from 'express';

import { AuthenticateUserController } from '../controllers/Users/AuthenticateUserController';
import { CreateUserController } from '../controllers/Users/CreateUserController';
import { ListUserReceivedComplimentsController } from '../controllers/Users/ListUserReceivedComplimentsController';
import { ListUsersController } from '../controllers/Users/ListUsersController';
import { ListUserSendedComplimentsController } from '../controllers/Users/ListUserSendedComplimentsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceivedComplimentsController =
    new ListUserReceivedComplimentsController();
const listUserSendedComplimentsController =
    new ListUserSendedComplimentsController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.get(
    '/compliments/received',
    ensureAuthenticated,
    listUserReceivedComplimentsController.handle
);
usersRoutes.get(
    '/compliments/sended',
    ensureAuthenticated,
    listUserSendedComplimentsController.handle
);

export default usersRoutes;
