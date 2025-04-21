import { Router } from "express";
const router = Router();

import { adminViewVendor, adminVendorApprove, vendorAllProducts, vendorProductStatus, vendorProducts } from './vendor.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.get('/adminViewVendor',checkAuthorization, adminRole, adminViewVendor);
router.post('/adminVendorApprove/:id',checkAuthorization, adminRole, adminVendorApprove);
router.get('/vendorAllProducts',checkAuthorization,adminRole,vendorAllProducts);
router.post('/vendorProductStatus/:id',checkAuthorization,adminRole,vendorProductStatus);
router.post('/vendorProducts',checkAuthorization,adminRole,vendorProducts);


export default router;