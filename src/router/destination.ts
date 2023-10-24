import { Router } from 'express';
const router = Router();
import Controller from '../controller/index';

router.post('/', Controller.Destination.create);
router.get('/', Controller.Destination.getAll);
router.get('/:id', Controller.Destination.getOne);
router.put('/:id', Controller.Destination.put);
router.delete('/:id', Controller.Destination.delete);

export default router;
