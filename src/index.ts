import dotenv from "dotenv";
dotenv.config();
const port = process.env.SERVER_PORT;
import express from "express";
const app = express();
import db from "./db";
import { configDotenv } from "dotenv";
configDotenv();

app.use("/images", express.static("./uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import allRouter from './routers';
app.use('/', allRouter);

db.then(() => {
    app.listen(port, () => console.log('Server is start on PORT :', port));
});