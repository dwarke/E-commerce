import mongoose from "mongoose";
import adminRegisterModel from './adminPanel/auth/auth.module';
import bcrypt from 'bcryptjs'

const db = mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce-API-task', {})
    .then(async () => {
        const adminData = { name: 'nisha', email: 'nisha@gmail.com', password: '123', phone: '1234567891', address: 'dfgsfgfsd', genderCategory: 'female' }
        const exist = await adminRegisterModel.findOne({ email: adminData.email });

        if (exist) {
            console.log('admin already exist!');
            return
        }
        const saltRouter = 10;
        const hashPassword = await bcrypt.hash(adminData.password, saltRouter);
        const user = new adminRegisterModel({ role:'admin', name: adminData.name, email: adminData.email, password: hashPassword, phone: adminData.phone, address: adminData.address, genderCategory: adminData.genderCategory });
        await user.save();
        console.log('DB connect')
    })
    .catch((err) => console.log(err));

export default db;
