import { Router } from 'express';
import UserController from '../controllers/UserController';

import { ensureAuthentication } from '../middlewares/EnsureAuthenticated';

const router = Router();

router
 .post('/user/login', UserController.login)
 .post('/user/create', UserController.createUser)
 .post('/user/delete', ensureAuthentication, UserController.deleteUser)
  
export default router;