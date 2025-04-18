import { Request, Response, NextFunction } from 'express';
import userRegisterModel from '../../vendorPanel/auth/auth.module'
import jwt from 'jsonwebtoken';
const secretKey = "Kaz5rw9hEwnEPP8m";

declare module 'express-serve-static-core' {
    interface Request {
        user?: { _id: string, email: string, role?: string }
    }
}

export const createToken = (user: { _id: string, email: string }) => {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    console.log(payload);
    return jwt.sign(payload, secretKey)
};

export const checkAuthorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            console.log('token not found');
            res.json({ msg: "token not found" })
            return
        }
        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
        const user = { _id: String(decoded._id), email: decoded.email };
        req.user = user;
        console.log("user---",user);
        next();

    } catch (error) {
        console.log('checkAuth : error', error)
        res.json({ msg: "checkAuth : error", error })
        throw error
    }
}

export const userBlocked = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?._id;
    const user = await userRegisterModel.findOne({ _id: userId });
    if (user?.isBlocked === false) {
        next()
    }
    else {
        res.json({ msg: "This User Are Blocked" })
        return
    }
}

