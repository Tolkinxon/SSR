"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_dto_1 = require("./controller.dto");
const error_1 = require("../utils/error");
const readFile_1 = require("../models/readFile");
const validator_1 = require("../utils/validator");
const writeFile_1 = require("../models/writeFile");
const jwt_1 = require("../lib/jwt/jwt");
const config_1 = require("../config");
const { content_types } = config_1.serverConfiguration;
const { createToken } = jwt_1.tokenServise;
class AuthController extends controller_dto_1.Auth {
    register(req, res) { }
    ;
    registerHtml(req, res) { }
    ;
    login(req, res) { }
    ;
    loginHtml(req, res) { }
    ;
    constructor() {
        super();
        this.register = async (req, res) => {
            try {
                let newUser = '';
                req.on("data", (chunk) => {
                    newUser += chunk;
                });
                req.on("end", async () => {
                    try {
                        let user = JSON.parse(newUser);
                        const validator = (0, validator_1.registorValidator)(user);
                        if (validator) {
                            let users = await (0, readFile_1.readFileUsers)('users.json');
                            if (users.some((item) => item.email == user.email))
                                throw new error_1.ClientError('This user avialable!', 400);
                            user = { id: users.length ? users.at(-1).id + 1 : 1, ...user };
                            users.push(user);
                            const checkWriteFile = await (0, writeFile_1.writeFile)('users.json', users);
                            if (checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({ message: 'success', status: 201, accessToken: createToken({ user_id: user.id, userAgent: req.headers["user-agent"] }) }));
                            }
                            else
                                throw new error_1.ServerError("User not saved");
                        }
                        else
                            res.end(JSON.stringify({ message: 'Incorrect' }));
                    }
                    catch (error) {
                        let err = {
                            message: error.message,
                            status: error.status
                        };
                        (0, error_1.globalError)(res, err);
                    }
                });
            }
            catch (error) {
                console.log(error);
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        };
        this.registerHtml = async (req, res) => {
            try {
                res.writeHead(200, { "content-type": 'text/html' });
                const registerHtml = await (0, readFile_1.readFilesPublic)('views/register.html');
                return res.end(registerHtml);
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        };
        this.login = async (req, res) => {
            try {
                let dataUser = '';
                req.on("data", (chunk) => {
                    dataUser += chunk;
                });
                req.on("end", async () => {
                    try {
                        let user = JSON.parse(dataUser);
                        const validator = (0, validator_1.loginValidator)(user);
                        if (validator) {
                            let users = await (0, readFile_1.readFileUsers)('users.json');
                            let foundUser = users.find((item) => item.email == user.email);
                            if (foundUser) {
                                if (foundUser.password == user.password) {
                                    res.statusCode = 201;
                                    return res.end(JSON.stringify({ message: 'success', status: 201, accessToken: createToken({ user_id: foundUser?.id, userAgent: req.headers["user-agent"] }) }));
                                }
                                else {
                                    res.statusCode = 400;
                                    return res.end(JSON.stringify({ message: 'Password incorrect', status: 400 }));
                                }
                            }
                            else {
                                res.statusCode = 400;
                                return res.end(JSON.stringify({ message: 'Email incorrect', status: 400 }));
                            }
                        }
                        else
                            res.end(JSON.stringify({ message: 'Incorrect' }));
                    }
                    catch (error) {
                        let err = {
                            message: error.message,
                            status: error.status
                        };
                        (0, error_1.globalError)(res, err);
                    }
                });
            }
            catch (error) {
                console.log(error);
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        };
        this.loginHtml = async (req, res) => {
            try {
                res.writeHead(200, { "content-type": 'text/html' });
                const loginHtml = await (0, readFile_1.readFilesPublic)('views/login.html');
                return res.end(loginHtml);
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        };
    }
}
exports.default = new AuthController;
