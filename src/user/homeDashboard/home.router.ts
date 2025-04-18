import { Router } from "express";
const router = Router();

import { userBlocked } from "../auth/auth.middleware";
import { checkAuthorization } from "../../adminPanel/auth/auth.middleware";
import { userGetProduct } from './home.controller';


router.post('/userGetProduct', checkAuthorization, userBlocked, userGetProduct);

export default router;  