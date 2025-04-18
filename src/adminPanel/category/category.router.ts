import { Router } from "express";
const router = Router();
import { adminAddCategory } from './category.controller';
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization, validateRequest } from "../auth/auth.middleware";
import { categoryValidation } from "./category.validation";

router.post('/adminAddCategory',checkAuthorization, adminRole, validateRequest(categoryValidation), adminAddCategory);


export default router;