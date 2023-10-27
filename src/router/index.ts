import { Router } from 'express';
const router = Router();
import Middlewares from '../middleware/index';
import authRoute from './auth';
import profileRoute from './profile';
import workspaceRouter from './workspace';
import homeRoute from './home';
import sourceRoute from './source';
import destinationRoute from './destination';
import piplineRoute from './pipeline';
import consumeRoute from './consume';

router.use('/auth', authRoute);
router.use('/profile', Middlewares.auth, profileRoute);
router.use('/workspace', Middlewares.auth, workspaceRouter);
router.use('/home', Middlewares.auth, homeRoute);
router.use('/source', Middlewares.auth, sourceRoute);
router.use('/destination', Middlewares.auth, destinationRoute);
router.use('/pipeline', Middlewares.auth, piplineRoute);
router.use('/consume', Middlewares.authConsume, consumeRoute);

export default router;
