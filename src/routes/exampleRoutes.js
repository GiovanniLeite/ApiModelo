import { Router } from 'express';

import ExampleController from '../controllers/ExampleController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', ExampleController.index);
router.get('/name/:name', ExampleController.index);
router.post('/', loginRequired, ExampleController.store);
router.put('/:id', loginRequired, ExampleController.update);
router.get('/:id', ExampleController.show);
router.delete('/:id', loginRequired, ExampleController.delete);

export default router;
