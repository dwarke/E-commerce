import { Router } from "express";
const router = Router();

import { vendorRole } from '../product/product.middleware'
import { checkAuthorization, userBlocked } from "../auth/auth.middleware";
import { penalDashboard } from './dashboard.controller';

router.post('/penalDashboard', checkAuthorization, userBlocked, vendorRole, penalDashboard);

export default router; 