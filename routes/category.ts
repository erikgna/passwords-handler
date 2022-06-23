import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import { ensureAuthentication } from '../middlewares/EnsureAuthenticated';

const router = Router();

router
.get('/category', ensureAuthentication, CategoryController.categorys)
.get('/category/:id', ensureAuthentication, CategoryController.oneCategory)
.post('/category', ensureAuthentication, CategoryController.createCategory)
.put('/category/:id', ensureAuthentication, CategoryController.editCategory)
.delete('/category/:id', ensureAuthentication, CategoryController.deleteCategory)
 
export default router;