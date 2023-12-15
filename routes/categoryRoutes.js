import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
// Router object
const router = express.Router()

//routing

// create Category Route || POST METHOD
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
// Update Category Route || POST METHOD
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
// Delete Category Route || POST METHOD
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

// getAll Category || GET METHOD
router.get('/get-category', categoryController)

//single category
router.get('/single-category/:slug',singleCategoryController)

export default router;
