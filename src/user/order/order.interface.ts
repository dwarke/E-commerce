import mongoose from "mongoose";

interface OrderProduct {
    cartId: string;
    productId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: mongoose.Types.ObjectId;
    quantity: number;
    vendorId: mongoose.Types.ObjectId;
    totalPrice: number;
}



export interface userOrder {
    userId:mongoose.Types.ObjectId,
    userAddress: string,
    products: OrderProduct[];
    totalAmount: number,
    status: string,
}


