import { Router } from "express";
const router = Router();
import { checkAuthorization,validateRequest } from "../../adminPanel/auth/auth.middleware";
import { registerValidation } from "../../vendorPanel/auth/auth.validation";
import { register, login, forgotPassword, resetPassword, logout, profile } from './auth.controller';

router.post('/register', validateRequest(registerValidation), register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/logout', logout);
router.post('/profile',checkAuthorization, profile);


export default router;