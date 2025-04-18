import { Router } from "express";
const router = Router();

import { upload, vendorRole } from './product.middleware'
import { checkAuthorization , userBlocked} from "../auth/auth.middleware";
import { validateRequest } from "../../adminPanel/auth/auth.middleware";
import { productValidation } from "./product.validation";

import { addProduct, deleteProduct, updateProduct, viewProduct } from './product.controller';

router.post('/addProduct', checkAuthorization , userBlocked, vendorRole, upload.array('images', 5),validateRequest(productValidation), addProduct);
router.post('/deleteProduct/:id', checkAuthorization , userBlocked, vendorRole, deleteProduct);
router.post('/updateProduct/:id', checkAuthorization , userBlocked, vendorRole, upload.array('images', 5), updateProduct);
router.get('/viewProduct', checkAuthorization , userBlocked, vendorRole, upload.array('images', 5), viewProduct);


export default router