import { Request, Response } from "express"
import { productModel } from '../product/product.module'
import { createResponse } from "../../responseHandler";
import mongoose from "mongoose";


export const viewProductRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const product = await productModel.aggregate([
            {
                $match: {
                    vendorId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "productreviews",
                    localField: "_id",
                    foreignField: "productId",
                    as: "productRating"
                }
            },
            {
                $unwind: "$productRating"
            },
            {
                $group: {
                    _id:"$_id",
                    name:{$first: '$name'},
                    ratingAndReview:{
                        $push:{
                            userId:'$productRating.userId',
                            rating:'$productRating.rating',
                            review:'$productRating.review',
                        }
                    }
                }
            },
        ]);
        
        createResponse(res, 200, true, "All products Rating", product);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}