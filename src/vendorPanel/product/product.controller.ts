import { Request, Response } from "express"
import { productModel } from './product.module'
import { categoryModel } from "../../adminPanel/category/category.module";
import { createResponse } from "../../responseHandler";
const BASE_URL = process.env.BASE_URL

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id
        const { name, description, price, stock, category } = req.body

        const imagePaths =
            req.files && Array.isArray(req.files)
                ? req.files.map((file: Express.Multer.File) => `${BASE_URL}/images/${file.filename}`)
                : [];

        const adminCategory = await categoryModel.findOne({ _id: category })
        if (!adminCategory) {
            createResponse(res, 404, false, "Category not available");
            return
        }
        const product = new productModel({ vendorId: userId, name, description, price, stock, category, images: imagePaths });
        await product.save();
        createResponse(res, 200, true, "Successfully product added", product);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const product = await productModel.findOneAndDelete({ _id: id });
        createResponse(res, 200, true, "Successfully product Deleted", product);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, description, price, stock, category } = req.body

        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            createResponse(res, 404, false, "Product not found");
            return;
        }

        const imagePaths =
            req.files && Array.isArray(req.files)
                ? req.files.map((file: Express.Multer.File) => `${BASE_URL}/uploads/${file.filename}`)
                : [];
        const adminCategory = await categoryModel.findOne({ category })
        if (category) {
            if (!adminCategory) {
                createResponse(res, 404, false, "Category not available");
                return
            }
        }
        const productUpdate = await productModel.findByIdAndUpdate(
            { _id: id },
            { name, description, price, stock, category, images: imagePaths },
            { new: true }
        );
        createResponse(res, 200, true, "Successfully product Updated", productUpdate);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const viewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const productView = await productModel.find({ userId });
        createResponse(res, 200, true, "your order All product", productView);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};





