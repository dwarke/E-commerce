import mongoose, { Schema, model } from "mongoose";
import { feedbackInterface } from "./feedback.interface";

const feedbackSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegister",
    },
    feedback: {
        type: String,
        required:true,
    },
}, { timestamps: true, versionKey:false })

export const feedbackModel = model<feedbackInterface>('websiteFeedBack', feedbackSchema);