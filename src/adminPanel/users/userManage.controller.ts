import { Request, Response } from "express";
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import { userOrderModel } from "../../user/order/order.module";
import { createResponse } from "../../responseHandler";
import { feedbackModel } from "../../user/feedback/feedback.module";


export const allUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRegisterModel.find({ role: 'user' });
        createResponse(res, 200, true, "All users", users);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};

export const userBlockUnblock = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const user = await userRegisterModel.findOne({ _id: id });
        if (!user) {
            createResponse(res, 400, true, "Invalid User");
            return
        }
        if (user.isBlocked === false) {
            user.isBlocked = true
            await user.save()
            createResponse(res, 200, true, "User are Successfully Blocked", user);
        }
        else {
            user.isBlocked = false
            await user.save()
            createResponse(res, 200, true, "User are Successfully UnBlocked", user);
        }
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const userBlocked = async (req: Request, res: Response): Promise<void> => {
    try {
        const userBlocked = await userRegisterModel.find({ isBlocked: true });
        createResponse(res, 200, true, "This users The Blocked", userBlocked);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}

export const userUpdate = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, email, address, phone, role } = req.body
        const profileUpdate = await userRegisterModel.findOneAndUpdate({ _id: id }, { name, email, address, phone, role }, { new: true })
        createResponse(res, 200, true, "User Profile are Updated", profileUpdate)

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const userOrderView = async (req: Request, res: Response): Promise<void> => {
    try {

        const userOrderData = await userOrderModel.aggregate([
            {
                $unwind: '$products'
            },
            {
                $group: {
                    _id: {
                        productId: '$products.productId',
                        name: '$products.name',
                        userId: '$userId',
                        userName: '$userName'
                    },
                    quantity: { $sum: '$products.quantity' },
                    totalAmount: { $sum: '$products.totalPrice' },
                    description: { $first: '$products.description' },
                    images: { $first: '$products.images' },
                    category: { $first: '$products.category' },
                }

            },
            {
                $group: {
                    _id: '$_id.userId',
                    userId: { $first: '$_id.userId' },
                    userName: { $first: '$_id.userName' },
                    products: {
                        $push: {
                            productId: '$_id.productId',
                            name: '$_id.name',
                            quantity: '$quantity',
                            totalAmount: '$totalAmount',
                            description: '$description',
                            images: '$images',
                            category: '$category'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    userName: 1,
                    products: 1
                }
            }
        ])
        console.log("userOrderData--------", userOrderData);
        createResponse(res, 200, true, "All users Order List", userOrderData)

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};

export const viewFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const alreadyFeedBack = await feedbackModel.aggregate([
            {
                $lookup: {
                    from: "userregisters",
                    localField: "userId",
                    foreignField: "_id",
                    as: "usersDetails"
                }
            },
            {
                $unwind: '$usersDetails'
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    feedback:1,
                    name: '$usersDetails.name',
                    address: '$usersDetails.address',
                    phone: '$usersDetails.phone',
                    profile: '$usersDetails.profile',
                }
            }
        ]);
        createResponse(res, 200, true, "All Website`s Feedback", alreadyFeedBack);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};

