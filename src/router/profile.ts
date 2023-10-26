import { Router } from 'express';
const router = Router();
import Controller from '../controller/index';

router.get('/', Controller.profile.get);
router.put('/', Controller.profile.update);

export default router;
