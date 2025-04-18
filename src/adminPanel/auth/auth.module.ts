import { Schema, model } from "mongoose";
import { register } from "./auth.interface";

const registerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (num: string) => /^[0-9]{10}$/.test(num.trim()),
            message: (props: { value: string }) => `${props.value} is not a valid mobile number! Please must be exactly 10 digits`,
        },
    },
    profile: {
        type: String,
        default: 'https://oceantech-mgp.s3.ap-south-1.amazonaws.com/mgp/AvatarImages/avatarImage-1739382148532.png'
    },
    genderCategory: {
        type: String,
        required: true,
        enum:['male','female'],
    },
    role: {
        type: String,
        default:'admin'
    },
    token: {
        type: String,
    },
    resetToken: {
        type: String,
    },
}, { timestamps: true, versionKey:false });

const register = model<register>('adminRegister', registerSchema);
export default register