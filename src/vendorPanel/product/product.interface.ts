import mongoose from "mongoose";

export interface product {
    vendorId:mongoose.Types.ObjectId,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: mongoose.Types.ObjectId,
    images: string[],
    status: string
}
