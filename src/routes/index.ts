import { Router } from 'express';
import usersRoutes from './usersRoute';
const routes = Router();

routes.use('/users', usersRoutes);

export default routes;