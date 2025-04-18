import { Router } from "express";
const router = Router();

import { adminSalesReport } from './report.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/adminSalesReport', checkAuthorization, adminRole, adminSalesReport );


export default router;