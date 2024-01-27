import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getAllProductController, 
       productCountController, productFilterController, productListController,
       productPhotoController, searchProductController, singleProductController,
       updateProductController ,relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController} from '../controllers/productController.js';
import formidable from 'express-formidable'
import braintree from 'braintree';
const router = express.Router()

//Routes

//                                                             GET METHOD

//PRODUCTS
router.get('/get-product', getAllProductController)

// SINGLE PRODUCT
router.get('/single-product/:slug',singleProductController)

//PRODUCT PHOTO
router.get('/product-photo/:pid',productPhotoController)

//PRODUCT COUNT
router.get('/product-count', productCountController)

//PRODUCT LIST
router.get('/product-list/:page', productListController)

// SEARCH PRODUCT
router.get('/search-product/:keyword', searchProductController)

// Similair PRODUCTS
router.get('/related-product/:pid/:cid', relatedProductController)
// Category Wise Products
router.get('/product-category/:slug',productCategoryController)

//                                                             POST METHOD

// CREATE PRODUCT
router.post('/create-product', requireSignIn, isAdmin , formidable(), createProductController)

// PRODUCT FILTERS
router.post('/product-filters', productFilterController)

//                                                             PUT METHOD

// UPDATE PRODUCT
router.put('/update-product/:pid', requireSignIn, isAdmin,formidable(),updateProductController)

//                                                             DELETE METHOD

//DELETE PRODUCT
router.delete('/delete-product/:pid', requireSignIn, isAdmin,deleteProductController)

// PAYMENT GATEWAY
//TOKEN
router.get('/braintree/token',braintreeTokenController)

//payment 
router.post('/braintree/payment',requireSignIn,braintreePaymentController)


export default router;