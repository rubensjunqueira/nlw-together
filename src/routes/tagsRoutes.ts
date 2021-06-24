import { Router } from 'express';
const tagsRoutes = Router();

import { CreateTagController } from '../controllers/Tags/CreateTagController';
import { ListTagsController } from '../controllers/Tags/ListTagsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRoutes.post('/', ensureAuthenticated, ensureAdmin, createTagController.handle);
tagsRoutes.get('/', ensureAuthenticated, listTagsController.handle);

export default tagsRoutes;