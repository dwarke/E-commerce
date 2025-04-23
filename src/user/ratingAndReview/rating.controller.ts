import { Request, Response } from "express"
import { productReviewModel } from './rating.module'
import { productModel } from "../../vendorPanel/product/product.module";
import vendorRegisterModel from '../../vendorPanel/auth/auth.module';
import { createResponse } from "../../responseHandler";


export const addRatingReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id;
        const { rating, review } = req.body;


        const product = await productModel.findOne({ _id: id, status: 'approve' })
        const vendorProduct = await vendorRegisterModel.findOne({_id:product?.vendorId, isBlocked:false})
        
        if (!product || !vendorProduct) {
            createResponse(res, 404, false, "product Are not exist");
            return
        }

        const productReview = await productReviewModel.findOne({ userId, productId: id });
        if(productReview){
            const updateRatingAndReview = await productReviewModel.findOneAndUpdate({userId, productId: id },{review,rating},{new:true});
            createResponse(res, 200, true, "product Review and rating added", updateRatingAndReview);
            return
        }
        const addReview = new productReviewModel({ productId: id, userId, review, rating });
        await addReview.save();
        createResponse(res, 200, true, "product Review and rating added", addReview);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const deleteRatingReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id;
        const deleteRateAndReview = await productReviewModel.findOneAndDelete({ _id: id, userId });
        createResponse(res, 200, true, "product Review and rating deleted", deleteRateAndReview);
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    }
};

export const getRatingReviews = async(req:Request,res:Response):Promise<void>=>{
    try {
        const id = req.params.id;
        const productReview = await productReviewModel.find({productId:id}).sort({"createdAt":-1});
        if(!productReview){
            createResponse(res, 404, false, "Your product not exist");
            return;
        }
        createResponse(res, 200, true, "Review and Rating of the Products ", productReview);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    };
};