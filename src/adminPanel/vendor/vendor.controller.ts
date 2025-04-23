import { Request, Response } from "express"
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import { createResponse } from "../../responseHandler";
import { productModel } from "../../vendorPanel/product/product.module";
import { userOrderModel } from "../../user/order/order.module";
import vendorModel from '../../vendorPanel/auth/auth.module'


//------- Vendor Approve -----------------//

export const viewAllVendor = async(req:Request,res:Response):Promise<void>=>{
    try {
        const vendors = await vendorModel.find({role:'vendor'}).sort({'createdAt':-1});
        createResponse(res, 200, true, "All Vendors", vendors);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    }
}

export const vendorApprove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const vendorRole = await userRegisterModel.findOne({ _id: id, role: 'vendor' });
        console.log("vendor---------", vendorRole);

        if (!vendorRole) {
            createResponse(res, 400, false, "User are not Exist");
            return;
        };
        if (status === 'approve') {
            const vendorStatus = await userRegisterModel.findOneAndUpdate({ _id: id }, { status }, { new: true });
            createResponse(res, 200, true, "Appointment Approved", vendorStatus);
            return;
        };
        if (status === 'reject') {
            const vendorStatus = await userRegisterModel.findOneAndDelete({ _id: id }, { status });
            createResponse(res, 200, true, "Appointment rejected", vendorStatus);
            return;
        };
        if (status != 'approve' && 'reject') {
            createResponse(res, 400, false, "You only have two options in the status: approve and reject");
            return;
        };

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    }
};

export const vendorAllProducts = async(req:Request,res:Response):Promise<void>=>{
    try {
        const products = await productModel.find({}).sort({'createdAt':-1});
        createResponse(res, 200, true, "All Products", products);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    }
}

export const vendorProductStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { status } = req.body
        const vendorProduct = await productModel.findOneAndUpdate({ _id: id }, { status }, { new: true });
        createResponse(res, 200, true, `this Product are ${status} `, vendorProduct);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    }
};

export const vendorProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await userOrderModel.aggregate([
            {
                $unwind: '$products'
            },
            {
                $addFields: {
                    totalSales:  "$products.quantity", 
                }
            },
            {
                $group:{
                  _id: '$products.productId',
                  vendorId: {$first:'$products.vendorId'},
                  name: {$first:'$products.name'},
                  description: {$first:'$products.description'},
                  price: {$first:'$products.price'},
                  category: {$first:'$products.category'},
                  images: {$first:'$products.images'},
                  totalSales:{$sum: "$totalSales" },
                  totalAmount: { $sum: "$totalAmount" },
                }
            },
            {
                $project: {
                    _id: 0,
                    vendorId: 1,
                    productId: '$_id',
                    name: 1,
                    description: 1,
                    price:1,
                    category:1,
                    images:1,
                    totalSales:1,
                    totalAmount:1
                }
            }
        ]);

        const overallTotals = products.reduce(
            (acc, product) => {
              acc.totalQuantity += product.totalSales;
              acc.totalRevenue += product.totalAmount;
              return acc;
            },
            { totalQuantity: 0, totalRevenue: 0 }
          );

        createResponse(res, 200, true, "All product Sales", {revenue:overallTotals,products});

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return;
    };
};

 






