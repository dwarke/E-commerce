import { Router } from "express";
const router = Router();

import { adminDashboard } from './dashboard.controller';
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/adminDashboard',checkAuthorization,adminRole,adminDashboard);
// router.post('/adminDashboardAllUsers',checkAuthorization,adminRole,adminDashboardAllUsers);


export default router;