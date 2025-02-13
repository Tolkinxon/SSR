"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chekToken = void 0;
const error_1 = require("../utils/error");
const jwt_1 = require("../lib/jwt/jwt");
const readFile_1 = require("../models/readFile");
const chekToken = async (req, res) => {
    try {
        let token = req.headers.token;
        if (!token)
            throw new error_1.ClientError('Unauthorized', 401);
        let verifyToken = jwt_1.tokenServise.verifyToken(token);
        let users = await (0, readFile_1.readFileUsers)('users.json');
        if (!(users.some((item) => item.id == verifyToken.user_id)))
            throw new error_1.ClientError('Token is invalid', 401);
        if (!(req.headers['user-agent'] == verifyToken.userAgent))
            throw new error_1.ClientError('Token is invalid', 401);
        return true;
    }
    catch (error) {
        let err = {
            message: error.message,
            status: error.status
        };
        (0, error_1.globalError)(res, err);
    }
};
exports.chekToken = chekToken;
