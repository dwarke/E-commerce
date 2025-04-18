"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db"));
const dotenv_2 = require("dotenv");
(0, dotenv_2.configDotenv)();
app.use("/images", express_1.default.static("./uploads"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const routers_1 = __importDefault(require("./routers"));
app.use('/', routers_1.default);
db_1.default.then(() => {
    app.listen(port, () => console.log('Server is start on PORT :', port));
});
//# sourceMappingURL=index.js.map