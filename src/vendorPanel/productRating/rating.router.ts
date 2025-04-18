import { Router } from "express";
const router = Router();

import { vendorRole } from '../product/product.middleware'
import { checkAuthorization, userBlocked } from "../auth/auth.middleware";

import { viewProductRating } from './rating.controller';

router.post('/viewProductRating/:id', checkAuthorization, userBlocked, vendorRole, viewProductRating);

export default router 