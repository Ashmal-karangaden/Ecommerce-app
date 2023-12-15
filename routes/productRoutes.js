import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getAllProductController, productCountController, productFilterController, productListController, productPhotoController, searchProductController, singleProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'
const router = express.Router()

//Routes

// GET METHOD

router.get('/get-product', getAllProductController)

router.get('/single-product/:slug',singleProductController)

router.get('/product-photo/:pid',productPhotoController)

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

// POST METHOD

router.post('/create-product', requireSignIn, isAdmin , formidable(), createProductController)

router.post('/product-filters', productFilterController)

// PUT METHOD

router.put('/update-product/:pid', requireSignIn, isAdmin,formidable(),updateProductController)

// DELETE METHOD

router.delete('/delete-product/:pid', requireSignIn, isAdmin,deleteProductController)

router.get('/search-product/:keyword', searchProductController)



export default router;