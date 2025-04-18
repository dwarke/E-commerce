import mongoose,{ Schema, model } from "mongoose";
import { shoppingCart } from "./cart.interface";

const shoppingCardSchema = new Schema({
    userId:{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'userRegister'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendorProduct'
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true, versionKey:false });

const shoppingCart = model<shoppingCart>('shoppingCard', shoppingCardSchema);
export default shoppingCart