import { Router } from "express";
const router = Router();

import { salesReport } from './report.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/salesReport', checkAuthorization, adminRole, salesReport );


export default router;