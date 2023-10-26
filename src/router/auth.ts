import { Router } from 'express';
const router = Router();
import Controller from '../controller/index';

router.post('/signup', Controller.auth.signup);
router.post('/login', Controller.auth.login);

export default router;
