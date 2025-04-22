import { Router } from "express";
const router = Router();

import { allUser, userBlockUnblock, userBlocked, userUpdate, userOrderView, viewFeedback } from './userManage.controller'
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization } from "../auth/auth.middleware";

router.post('/allUser', checkAuthorization, adminRole, allUser);
router.post('/userBlockUnblock/:id', checkAuthorization, adminRole, userBlockUnblock);
router.post('/userBlocked', checkAuthorization, adminRole, userBlocked);
router.post('/userUpdate/:id', checkAuthorization, adminRole, userUpdate);
router.post('/userOrderView', checkAuthorization, adminRole, userOrderView);
router.post('/viewFeedback', checkAuthorization, adminRole, viewFeedback);


export default router;