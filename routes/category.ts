import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router
.get('/category', CategoryController.categorys)
.get('/category/:id', CategoryController.oneCategory)
.post('/category', CategoryController.createCategory)
.put('/category/:id', CategoryController.editCategory)
.delete('/category/:id', CategoryController.deleteCategory)
 
export default router;