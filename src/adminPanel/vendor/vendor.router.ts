import { Router } from "express";
const router = Router();

import { viewAllVendor, vendorApprove, vendorAllProducts, vendorProductStatus, vendorProducts } from './vendor.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.get('/viewAllVendor',checkAuthorization, adminRole, viewAllVendor);
router.post('/vendorApprove/:id',checkAuthorization, adminRole, vendorApprove);
router.get('/vendorAllProducts',checkAuthorization,adminRole,vendorAllProducts);
router.post('/vendorProductStatus/:id',checkAuthorization,adminRole,vendorProductStatus);
router.post('/vendorProducts',checkAuthorization,adminRole,vendorProducts);


export default router;