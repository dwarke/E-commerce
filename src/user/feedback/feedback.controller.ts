import { Request, Response } from "express"
import { feedbackModel } from "./feedback.module";
import { createResponse } from "../../responseHandler";



export const addFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { feedback } = req.body
        const alreadyFeedBack = await feedbackModel.findOne({ userId });
        if (alreadyFeedBack) {
            const updateFeedBack = await feedbackModel.findOneAndUpdate({ userId }, { feedback });
            createResponse(res, 200, true, "Thank you for providing Feedback on the Website.", updateFeedBack);
        }
        const addFeedback = new feedbackModel({ userId, feedback });
        await addFeedback.save();
        createResponse(res, 200, true, "Thank you for providing Feedback on the Website.", addFeedback);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    };
};

export const getFeedback = async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id
        const alreadyFeedBack = await feedbackModel.findOne({ userId });
        createResponse(res, 200, true, "Thank you for providing Feedback on the Website.", alreadyFeedBack);
        
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}