import { Router } from "express";
const router = Router();

import {  userBlocked } from "../auth/auth.middleware";
import { addRatingReviews, deleteRatingReviews, getRatingReviews } from './rating.controller';
import { checkAuthorization,validateRequest } from "../../adminPanel/auth/auth.middleware";
import { reviewValidationSchema } from "./rating.validation";

router.post('/addRatingReviews/:id',checkAuthorization, userBlocked, validateRequest(reviewValidationSchema),addRatingReviews)
router.post('/deleteRatingReviews/:id',checkAuthorization, userBlocked,deleteRatingReviews)
router.get('/getRatingReviews/:id',checkAuthorization, userBlocked,getRatingReviews)

export default router;  