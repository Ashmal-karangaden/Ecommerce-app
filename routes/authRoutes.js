import express from 'express'
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController } from "../controllers/authController.js"
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
// Router object
const router = express.Router()

//routing
// test routes
router.get('/test', requireSignIn, isAdmin, testController)

//REGISTER || METHODE POST
router.post('/register', registerController)

//FORGOTPASSWORD || METHODE POST
router.post('/forgot-password', forgotPasswordController)

//LOGIN || METHODE POST
router.post('/login', loginController)

// Protected User Route Auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
// Protected Admin Route Auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//UPDATE PROFILE
router.put('/profile', requireSignIn, updateProfileController)

// orders
router.get('/orders', requireSignIn, getOrdersController)
export default router;