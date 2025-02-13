"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const readFile_1 = require("../models/readFile");
const jwt_1 = require("../lib/jwt/jwt");
const config_1 = require("../config");
const { content_types } = config_1.serverConfiguration;
const { createToken } = jwt_1.tokenServise;
class JsAndCssLoadController {
    jsAndCssLoad(req, res) { }
    ;
    constructor() {
        this.jsAndCssLoad = async (req, res) => {
            const reqUrl = req.url.trim().toLowerCase();
            const filePath = reqUrl.slice(1);
            const headerName = reqUrl.split('/')[1];
            try {
                if (headerName == 'js')
                    res.writeHead(200, { "content-type": 'text/javascript' });
                else
                    res.writeHead(200, { "content-type": 'text/css' });
                const jsAndCssFile = await (0, readFile_1.readFilesPublic)(filePath);
                return res.end(jsAndCssFile);
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
exports.default = new JsAndCssLoadController;
