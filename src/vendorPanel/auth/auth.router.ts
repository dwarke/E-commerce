import { Router } from "express";
const router = Router();
import { registerValidation } from "./auth.validation";
import { checkAuthorization } from "./auth.middleware";
import { validateRequest } from "../../adminPanel/auth/auth.middleware";
import { register, login, forgotPassword, resetPassword, logout, profile } from './auth.controller';

router.post('/register', validateRequest(registerValidation), register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/logout', logout);
router.post('/profile',checkAuthorization, profile);


export default router;