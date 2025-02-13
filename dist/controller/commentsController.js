"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const readFile_1 = require("../models/readFile");
const jwt_1 = require("../lib/jwt/jwt");
const config_1 = require("../config");
const { content_types } = config_1.serverConfiguration;
const { createToken } = jwt_1.tokenServise;
class CommentsController {
    mainPage(req, res) { }
    ;
    constructor() {
        this.mainPage = async (req, res) => {
            try {
                res.writeHead(200, { "content-type": 'text/html' });
                const mainHtml = await (0, readFile_1.readFilesPublic)('views/main.html');
                return res.end(mainHtml);
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
exports.default = new CommentsController;
