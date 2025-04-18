import { Request, Response, NextFunction } from 'express';
import adminRegisterModel from './auth.module';
import { ObjectSchema } from 'joi';
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
        
        next();

    } catch (error) {
        console.log('checkAuth : error', error)
        res.json({ msg: "checkAuth : error", error })
        throw error
    }
}


export const adminRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.user?._id;
    const roleData = await adminRegisterModel.findOne({ _id: data });
    if (!roleData) {
        console.log('data not found');
        return
    }
    if (roleData.role === 'admin') {
        next()
    } else {
        res.json({ msg: "You are note admin so Don`t view all data" })
        return
    }
}


export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details.map(err => err.message).join(', ')
        });
        return;
      }
      next();
    };
  };

