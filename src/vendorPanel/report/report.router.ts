import { Router } from "express";
const router = Router();

import { vendorRole } from '../product/product.middleware'
import { checkAuthorization, userBlocked } from "../auth/auth.middleware";

import { vendorProductReport, getWebsiteFeedback } from './report.controller';

router.post('/vendorProductReport', checkAuthorization, userBlocked, vendorRole, vendorProductReport);
router.post('/getWebsiteFeedback', checkAuthorization, userBlocked, vendorRole, getWebsiteFeedback);

export default router 
