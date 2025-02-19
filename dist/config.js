"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfiguration = void 0;
const dotenv_1 = require("dotenv");
const node_path_1 = __importDefault(require("node:path"));
(0, dotenv_1.config)();
exports.serverConfiguration = {
    port: process.env.PORT || 5000,
    dbFilePath: (filePath) => node_path_1.default.resolve('db', filePath),
    publicFilePath: (filePath) => node_path_1.default.resolve('src', 'public', filePath),
    publicImgPath: (filePath) => node_path_1.default.resolve('src', 'public', 'img', filePath),
    content_types: {
        ["js"]: "text/javascript",
        ["css"]: "text/css"
    }
};
