import { Request, Response } from "express"
import { productModel } from '../../vendorPanel/product/product.module'
import userShoppingModel from './cart.module'
import { createResponse } from "../../responseHandler";
import userRegisterModel from '../../vendorPanel/auth/auth.module'



export const addShoppingCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        console.log(userId);
        const { productId, quantity } = req.body;
        const product = await productModel.findOne({ _id: productId, status: 'approve' })
        const vendorProduct = await userRegisterModel.findOne({_id:product?.vendorId, isBlocked:false})
        
        if (!product || !vendorProduct) {
            createResponse(res, 404, false, "product Are not exist");
            return
        }
        const shoppingCart = await userShoppingModel.findOne({ productId, userId });
        console.log("shoppingCart-----", shoppingCart);
        if (shoppingCart) {
            const shoppingCartAdded = await userShoppingModel.findOneAndUpdate(
                { userId, productId },
                { $inc: { quantity: quantity } },
                { new: true }
            );
            createResponse(res, 200, true, "Product Are Updated", shoppingCartAdded);
            return
        }
        const shoppingCartAdded = new userShoppingModel({ userId, productId, quantity })
        await shoppingCartAdded.save();
        createResponse(res, 200, true, "Successfully product added", shoppingCartAdded);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const deleteShoppingCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id
        const deleteShoppingCard = await userShoppingModel.findOneAndDelete({ _id: id, userId });
        createResponse(res, 200, true, "Your Card Deleted", deleteShoppingCard);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};


export const getShoppingCard = async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id;
        const getCart = await userShoppingModel.find({userId});
        if(!getCart){
            createResponse(res, 404, false, "Cart are not exist!");
            return
        };
        createResponse(res, 200, true, "All your Shopping Carts", getCart);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}

