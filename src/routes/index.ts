import { Router } from 'express';

import complimentsRoutes from './complimentsRoutes';
import tagsRoutes from './tagsRoutes';
import usersRoutes from './usersRoute';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/compliments', complimentsRoutes);

export default routes;
