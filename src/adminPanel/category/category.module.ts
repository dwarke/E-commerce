import mongoose, { Schema, model } from "mongoose";
import { category } from "./category.interface";


const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });

export const categoryModel = model<category>('adminCategory', categorySchema);


