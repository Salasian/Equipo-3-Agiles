import {Router} from 'express';
import authController from '../controllers/auth.controller.js';
import { isAuthClient } from '../middlewares/isAuthClient.js';
import { isAuthAdmin } from '../middlewares/isAuthAdmin.js';
import validationAuth from '../middlewares/validationAuth.js';
const router = Router();

router.post('/login', validationAuth.validationAuth, authController.login);

router.get('/info', isAuthClient, authController.info);

router.get('/adminInfo', isAuthAdmin, authController.info);

export default router;