import { Router } from "express";
const router = Router();

import { addWishlist, getWishlist } from './wishList.controller'
import {  userBlocked } from "../auth/auth.middleware";
import { checkAuthorization,validateRequest } from "../../adminPanel/auth/auth.middleware";
import { wishlistValidation } from "./wishlist.validation";

router.post('/addWishlist/:id', checkAuthorization , userBlocked, validateRequest(wishlistValidation), addWishlist);
router.get('/getWishlist', checkAuthorization , userBlocked, getWishlist);

export default router;