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
                let newUser = [];
                req.on("data", (chunk) => {
                    newUser.push(chunk);
                });
                req.on("end", async () => {
                    try {
                        const combinedBuffer = Buffer.concat(newUser);
                        const lines = Buffer.from('\r\n\r\n');
                        const positionLines = combinedBuffer.lastIndexOf(lines);
                        const boundary = req.headers['content-type']?.split('boundary=')[1];
                        let user = combinedBuffer.subarray(0, positionLines).toString('utf-8').split(boundary + '\r\nContent-Disposition: form-data; name=');
                        let imgBuffer = combinedBuffer.subarray(positionLines + 4);
                        const extention = user[4].split('\r\n')[1].split(' ')[1].split('/')[1];
                        let userObj = {
                            name: user[1].split('\r\n')[2],
                            email: user[2].split('\r\n')[2],
                            password: user[3].split('\r\n')[2],
                            image: extention
                        };
                        const validator = (0, validator_1.registorValidator)(userObj);
                        if (validator) {
                            let users = await (0, readFile_1.readFileUsers)('users.json');
                            if (users.some((item) => item.email == userObj.email))
                                throw new error_1.ClientError('This user avialable!', 400);
                            userObj = { id: users.length ? users.at(-1).id + 1 : 1, ...userObj };
                            userObj.image = `/img/${userObj.id}.${extention}`;
                            const uploadImg = await (0, writeFile_1.writeFileImg)(`${userObj.id}.${extention}`, imgBuffer);
                            if (uploadImg)
                                users.push(userObj);
                            else
                                throw new error_1.ServerError("Image not saved");
                            const checkWriteFile = await (0, writeFile_1.writeFile)('users.json', users);
                            if (checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({ message: 'success', status: 201, user_name: userObj.name, user_img: userObj.image, accessToken: createToken({ user_id: userObj.id, userAgent: req.headers["user-agent"] }) }));
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
                                    return res.end(JSON.stringify({ message: 'success', user_name: foundUser.name, status: 201, user_img: foundUser.image, accessToken: createToken({ user_id: foundUser?.id, userAgent: req.headers["user-agent"] }) }));
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
