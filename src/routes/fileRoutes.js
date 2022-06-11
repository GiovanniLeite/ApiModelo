import { Router } from 'express';

import FileController from '../controllers/FileController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, FileController.store);
router.delete('/:id', loginRequired, FileController.delete);

export default router;
