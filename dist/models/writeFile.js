"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileImg = exports.writeFile = void 0;
const config_1 = require("../config");
const promises_1 = __importDefault(require("node:fs/promises"));
const { dbFilePath, publicImgPath } = config_1.serverConfiguration;
const writeFile = async (fileName, body) => {
    await promises_1.default.writeFile(dbFilePath(fileName), JSON.stringify(body, null, 4));
    return true;
};
exports.writeFile = writeFile;
const writeFileImg = async (fileName, body) => {
    await promises_1.default.writeFile(publicImgPath(fileName), body);
    return true;
};
exports.writeFileImg = writeFileImg;
