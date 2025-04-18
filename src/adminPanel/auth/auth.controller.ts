import { Request, Response } from "express"
import adminRegisterModel from './auth.module'
import bcrypt from 'bcryptjs'
import { createToken } from "./auth.middleware";
import crypto from 'crypto'
import { createResponse } from "../../responseHandler";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, address, genderCategory } = req.body;
        const exist = await adminRegisterModel.findOne({ email })
        if (exist) {
            createResponse(res, 400, false, "User is Already Exist")
            return
        }
        const saltRouter = 10;      
        const hashPassword = await bcrypt.hash(password, saltRouter);
        const user = new adminRegisterModel({ name, email, password: hashPassword, phone, address, genderCategory });
        await user.save();
        createResponse(res, 200, true, "Successfully Register", user);

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const data = await adminRegisterModel.findOne({ email })
        if (!data) {
            createResponse(res, 400, false, "User is not Exist")
            return
        }
        const comparePassword = await bcrypt.compare(password, data.password);
        if (!comparePassword) createResponse(res, 404, false, "In valid password");
        if (data.role === 'admin') {
            const userObj = data.toObject();
            const token = createToken({ _id: String(userObj._id), email: userObj.email });
            createResponse(res, 200, true, "You are Login", token);
            return;
        }
        else {
            createResponse(res, 400, false, "You are not admin")
            return
        }
    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message)
        return

    }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body
        const user = await adminRegisterModel.findOne({ email });
        if (!user) {
            createResponse(res, 404, false, "User is not Found");
            return
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiredAt = Date.now() + 36000000;
        user.token = resetToken;
        user.resetToken = String(expiredAt)
        await user.save();
        createResponse(res, 200, true, "Pleas Reset password You are able", { token: resetToken, expiredAt });
        return

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message)
        return
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, token, newPassword } = req.body;
    console.log(req.body);
    try {
        const user = await adminRegisterModel.findOne({
            email, token
        })
        if (!user) {
            createResponse(res, 404, false, "Invalid or expired token");
            return
        }
        const compar = await bcrypt.compare(user.password, newPassword)
        console.log("...compar", compar, typeof compar);

        if (compar === false) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(newPassword, saltRounds);
            console.log(bcrypt.hash(newPassword, saltRounds));
            user.token = undefined;
            user.resetToken = undefined;
            await user.save()
            createResponse(res, 200, true, "password is changed", user)
        }
        createResponse(res, 400, false, "Your old password and New password Both are same")
        return

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message)
        return
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.header('Authorization')
        const logout = await adminRegisterModel.findByIdAndUpdate(
            { _id: req.user?._id },
            { $pull: { token: token } }
        )
        if (!logout) {
            createResponse(res, 404, false, "Invalid or expired token");
            return
        }
        logout.token = undefined
        createResponse(res, 200, true, "Logged out successfully", logout)

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message)
        return
    }
}

export const profile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { name, email, address,genderCategory, phone } = req.body;

        const userUpdate = await adminRegisterModel.findOneAndUpdate({ _id: userId }, { name, email, address, genderCategory, phone }, { new: true });
        createResponse(res, 200, true, "Logged out successfully", userUpdate)

    } catch (error) {
        createResponse(res, 500, false, "Failed to fetch User", null, (error as Error).message);
        return
    }
}
