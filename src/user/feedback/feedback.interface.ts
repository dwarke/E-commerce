import { ObjectId } from "mongoose";

export interface feedbackInterface{
    userId:ObjectId,
    feedback:string
}