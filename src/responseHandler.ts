import { Response } from "express";

export
    function createResponse<T>(res: Response, statusCode: number, success: boolean, message: string, data?: T, error?: string) {
    const response = {
        success, message, data, error
    };
    return res.status(statusCode).json(response);
};
