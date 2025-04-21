import { Request, Response } from "express"
import {userWishlistModel} from './wishList.module'
import { productModel } from "../../vendorPanel/product/product.module";
import { createResponse } from "../../responseHandler";
import vendorRegisterModel from '../../vendorPanel/auth/auth.module'
import mongoose from "mongoose";



export const addWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const userId = req.user?._id;

        const product = await productModel.findOne({ _id: id, status: 'approve' })
        const vendorProduct = await vendorRegisterModel.findOne({_id:product?.vendorId, isBlocked:false})
        
        if (!product || !vendorProduct) {
            createResponse(res, 404, false, "product Are not exist");
            return
        }

        const wishlist = await userWishlistModel.findOne({ userId });
        if (!wishlist) {
            const userWishlist = new userWishlistModel({ userId, productId: id })
            await userWishlist.save()
            createResponse(res, 200, true, "product are added wishlist", userWishlist);
            return
        }
        const userWishlist = await userWishlistModel.findOne({ userId, productId: id });
        if (userWishlist) {
            const userWishlistUnLike = await userWishlistModel.findOneAndUpdate(
                { userId, productId: id }, 
                { $pull: { productId: id } }, 
                { new: true }
            );
            createResponse(res, 200, true, "product are remove wishlist", userWishlistUnLike);
            return
        }
        if (!userWishlist) {
            const userWishlistLike = await userWishlistModel.findOneAndUpdate(
                { userId }, 
                { $push: { productId: id } }, 
                { new: true }
            );
            createResponse(res, 200, true, "product are remove wishlist", userWishlistLike);
            return
        }
        await userWishlistModel.deleteOne({ userId, productId: [] });
        createResponse(res, 200, true, "All remove Wishlist Products");
        return

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}

export const getWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const aggregation = [
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) } // Only fetch current user's wishlist
            },
            { $unwind: "$productId" },
            {
                $lookup: {
                    from: 'vendorproducts',
                    localField: "productId",
                    foreignField: "_id",
                    as: 'productDetails'
                }
            },
            { $unwind: "$productDetails" },
            {
                $group: {
                    _id: "$userId",
                    userId: { $first: "$userId" },
                    products: {
                        $push: {
                            productId: "$productId",
                            name: "$productDetails.name",
                            category: "$productDetails.category",
                            image: "$productDetails.images",
                            description: "$productDetails.description",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    products: 1
                }
            }
        ]
        const showWishlist = await userWishlistModel.aggregate(aggregation);
        createResponse(res, 200, true, "Your All wishlist", showWishlist);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}