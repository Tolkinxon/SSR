"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_dto_1 = require("./controller.dto");
const error_1 = require("../utils/error");
const readFile_1 = require("../models/readFile");
const validator_1 = require("../utils/validator");
const writeFile_1 = require("../models/writeFile");
const jwt_1 = require("../lib/jwt/jwt");
const { createToken } = jwt_1.tokenServise;
class AuthController extends controller_dto_1.Auth {
    register(req, res) { }
    ;
    login(req, res) { }
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
                            if (checkWriteFile)
                                res.end(JSON.stringify({ message: 'success', status: 201, accessToken: createToken({ user_id: user.id, userAgent: req.headers["user-agent"] }) }));
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
        this.login = async () => { };
    }
}
exports.default = new AuthController;
