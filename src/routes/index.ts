import { Router } from 'express';
import usersRoutes from './usersRoute';
import tagsRoutes from './tagsRoutes';
import complimentsRoutes from './complimentsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/compliments', complimentsRoutes);

export default routes;