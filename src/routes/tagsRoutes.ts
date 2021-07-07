import { Router } from 'express';

import { CreateTagController } from '../controllers/Tags/CreateTagController';
import { ListTagsController } from '../controllers/Tags/ListTagsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);
tagsRoutes.get('/', ensureAuthenticated, listTagsController.handle);

export default tagsRoutes;
