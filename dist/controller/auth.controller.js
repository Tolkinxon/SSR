"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_dto_1 = require("./controller.dto");
const promises_1 = __importDefault(require("node:fs/promises"));
const error_1 = require("../utils/error");
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
                req.on("end", () => {
                    try {
                        let users = await promises_1.default.readFile();
                    }
                    catch (error) {
                        console.log(error);
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
