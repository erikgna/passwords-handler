import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';

const router = Router();

router
 .get('/password', PasswordController.passwords)
 .get('/password/:id', PasswordController.onePassword)
 .post('/password', PasswordController.createPassword)
 .put('/password/:id', PasswordController.editPassword)
 .delete('/password/:id', PasswordController.deletePassword)
 
export default router;