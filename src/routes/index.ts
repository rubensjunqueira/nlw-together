import { Router } from 'express';
import usersRoutes from './usersRoute';
import tagsRoutes from './tagsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);

export default routes;