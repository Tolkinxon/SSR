"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFilesPublic = exports.readFileUsers = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const config_1 = require("../config");
const { dbFilePath, publicFilePath } = config_1.serverConfiguration;
const readFileUsers = async (fileName) => {
    let users = await promises_1.default.readFile(dbFilePath(fileName), 'utf-8');
    return users ? JSON.parse(users) : [];
};
exports.readFileUsers = readFileUsers;
const readFilesPublic = async (fileName) => {
    if (fileName.includes('img')) {
        let publicFile = await promises_1.default.readFile(publicFilePath(fileName));
        return publicFile;
    }
    else {
        let publicFile = await promises_1.default.readFile(publicFilePath(fileName), 'utf-8');
        return publicFile;
    }
};
exports.readFilesPublic = readFilesPublic;
