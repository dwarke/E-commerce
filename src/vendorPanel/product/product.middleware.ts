import {Request,Response,NextFunction} from 'express'
import multer from 'multer';
import fs from 'fs'
import path from 'path';
const uploadDir = '../../../uploads'; 
import userRegisterModel from '../../vendorPanel/auth/auth.module'

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage  = multer.diskStorage({
    destination: function(req:Request,file,cb){
        cb(null,uploadDir)
    },
    filename: function (req:Request,file,cb){
        return cb(null,`${file.originalname}`);
    }
});
export const upload = multer({ storage: storage });

// http://localhost:2025/1744877583219-522711.jpg
export const vendorRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.user?._id;
    const roleData = await userRegisterModel.findOne({ _id: data });
    if (!roleData) {
        console.log('data not found');
        return
    }
    if (roleData.role === 'admin' || 'vendor') {
        next()
    } else {
        res.json({ msg: "You are note admin or vendor so Don`t view all data" })
        return
    }
}