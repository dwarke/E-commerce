import { Router } from "express";
const router = Router();

import { vendorRole } from '../product/product.middleware'
import { checkAuthorization, userBlocked } from "../auth/auth.middleware";
import { viewUserOrderList, userOrderStatus } from './order.controller';

router.post('/viewUserOrderList', checkAuthorization, userBlocked, vendorRole, viewUserOrderList);
router.post('/userOrderStatus/:id', checkAuthorization, userBlocked, vendorRole, userOrderStatus);

export default router;   