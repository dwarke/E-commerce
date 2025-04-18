import { Router } from "express";
const router = Router();

import {  userBlocked } from "../auth/auth.middleware";
import { addOrder, getOrders } from './order.controller';
import {checkAuthorization, validateRequest } from "../../adminPanel/auth/auth.middleware";
import { orderValidationSchema } from "./order.validation";

router.post('/addOrder', checkAuthorization, userBlocked, validateRequest(orderValidationSchema), addOrder)
router.get('/getOrders', checkAuthorization, userBlocked, getOrders)

export default router;  