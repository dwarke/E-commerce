import { Router } from "express";
const router = Router();

import { adminVendorApprove,  vendorProductStatus, vendorProducts } from './vendor.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/adminVendorApprove/:id',checkAuthorization, adminRole, adminVendorApprove);
router.post('/vendorProductStatus/:id',checkAuthorization,adminRole,vendorProductStatus);
router.post('/vendorProducts',checkAuthorization,adminRole,vendorProducts);


export default router;