"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(res, statusCode, success, message, data, error) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
}
;
//# sourceMappingURL=responseHandler.js.map