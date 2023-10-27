import { Router } from 'express';
const router = Router();
import Controller from '../controller/index';

router.get('/', Controller.workspace.get);
router.put('/', Controller.workspace.update);

export default router;
