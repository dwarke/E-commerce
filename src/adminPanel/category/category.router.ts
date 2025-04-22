import { Router } from "express";
const router = Router();
import { addCategory, deleteCategory, getCategory } from './category.controller';
import { adminRole } from "../auth/auth.middleware";
import { checkAuthorization, validateRequest } from "../auth/auth.middleware";
import { categoryValidation } from "./category.validation";

router.post('/addCategory',checkAuthorization, adminRole, validateRequest(categoryValidation), addCategory);
router.post('/deleteCategory/:id',checkAuthorization, adminRole, deleteCategory);
router.post('/getCategory',checkAuthorization, adminRole, getCategory);


export default router;