import { Request, Response } from "express"
import { categoryModel } from "./category.module";
import { createResponse } from "../../responseHandler";
import { productModel } from "../../vendorPanel/product/product.module";

//--------------------category Management -----------------//

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.body;
        const categoryList = new categoryModel({ category });
        await categoryList.save();
        createResponse(res, 200, true, "Successfully category Added", categoryList);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}

export const deleteCategory = async(req:Request,res:Response):Promise<void>=>{
    try {
        const id = req.params.id
        const category = await categoryModel.findOneAndDelete({_id:id});
        await productModel.findOneAndDelete({category:id});
        createResponse(res, 200, true, "Category deleted", category);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};

export const getCategory = async(req:Request,res:Response):Promise<void>=>{
    try {
        const category = await categoryModel.find({});
        createResponse(res, 200, true, "All Categories ", category);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};