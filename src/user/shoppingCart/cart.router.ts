import { Router } from "express";
const router = Router();

import {  userBlocked } from "../auth/auth.middleware";
import { addShoppingCard, deleteShoppingCard ,getShoppingCard} from './cart.controller';
import { checkAuthorization,validateRequest } from "../../adminPanel/auth/auth.middleware";
import { shoppingCartValidation } from "./cart.validation";


router.post('/addShoppingCard', checkAuthorization, userBlocked, validateRequest(shoppingCartValidation), addShoppingCard);
router.post('/deleteShoppingCard/:id', checkAuthorization, userBlocked, deleteShoppingCard);
router.get('/getShoppingCard', checkAuthorization, userBlocked, getShoppingCard);

export default router;  