import { Request, Response } from "express"
import { categoryModel } from "./category.module";
import { createResponse } from "../../responseHandler";

//--------------------category Management -----------------//

export const adminAddCategory = async (req: Request, res: Response): Promise<void> => {
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