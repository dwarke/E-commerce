import { Router } from "express";
const router = Router();

import { userBlocked } from "../auth/auth.middleware";
import { checkAuthorization, validateRequest } from "../../adminPanel/auth/auth.middleware";
import { addFeedback, getFeedback } from './feedback.controller';
import { feedbackSchema } from "./feedback.validation";


router.post('/addFeedback', checkAuthorization, userBlocked, validateRequest(feedbackSchema), addFeedback);
router.get('/getFeedback', checkAuthorization, userBlocked, getFeedback);

export default router;  