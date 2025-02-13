"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const config_1 = require("./config");
const types_1 = require("./types");
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
const JsAndCssLoad_controller_1 = __importDefault(require("./controller/JsAndCssLoad.controller"));
const checkToken_1 = require("./models/checkToken");
const commentsController_1 = __importDefault(require("./controller/commentsController"));
const { port } = config_1.serverConfiguration;
const server = node_http_1.default.createServer(async (req, res) => {
    const reqUrl = req.url.trim().toLowerCase();
    const reqMethod = req.method.trim().toUpperCase();
    console.log(reqUrl);
    res.setHeader("Content-Type", "application/json");
    if (reqUrl.startsWith('/api/auth/login') && reqMethod == types_1.METHODS.READ)
        auth_controller_1.default.loginHtml(req, res);
    if (reqUrl.startsWith('/api/auth/register') && reqMethod == types_1.METHODS.CREATE)
        auth_controller_1.default.register(req, res);
    if (reqUrl.startsWith('/api/auth/register') && reqMethod == types_1.METHODS.READ)
        auth_controller_1.default.registerHtml(req, res);
    if (reqUrl.includes('/css') || reqUrl.includes('/js'))
        JsAndCssLoad_controller_1.default.jsAndCssLoad(req, res);
    if (!(reqUrl.includes('/api')) && reqMethod == types_1.METHODS.READ) {
        if (await (0, checkToken_1.chekToken)(req, res)) {
            if (reqUrl == '/')
                commentsController_1.default.mainPage(req, res);
        }
    }
});
server.listen(port, () => {
    console.log(`Server runnig on port-${port}`);
});
