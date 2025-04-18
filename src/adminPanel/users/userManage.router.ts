import { Router } from "express";
const router = Router();

import { adminUserBlockUnblock, adminUserBlocked, adminUserUpdate, adminUserOrderView } from './userManage.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/adminUserBlockUnblock/:id', checkAuthorization, adminRole, adminUserBlockUnblock);
router.post('/adminUserBlocked/:id', checkAuthorization, adminRole, adminUserBlocked);
router.post('/adminUserUpdate/:id', checkAuthorization, adminRole, adminUserUpdate);
router.post('/adminUserOrderView', checkAuthorization, adminRole, adminUserOrderView);


export default router;