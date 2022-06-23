import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';
import { ensureAuthentication } from '../middlewares/EnsureAuthenticated';

const router = Router();

router
 .get('/password', ensureAuthentication, PasswordController.passwords)
 .get('/password/:id', ensureAuthentication, PasswordController.onePassword)
 .post('/password', ensureAuthentication, PasswordController.createPassword)
 .put('/password/:id', ensureAuthentication, PasswordController.editPassword)
 .delete('/password/:id', ensureAuthentication, PasswordController.deletePassword)
 
export default router;