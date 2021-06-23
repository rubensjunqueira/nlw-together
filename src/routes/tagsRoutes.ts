import { Router } from 'express';
const tagsRoutes = Router();

import { CreateTagController } from '../controllers/Tags/CreateTagController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const createTagController = new CreateTagController();

tagsRoutes.post('/', ensureAdmin, createTagController.handle);

export default tagsRoutes;