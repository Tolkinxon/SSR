"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const readFile_1 = require("../models/readFile");
const writeFile_1 = require("../models/writeFile");
const jwt_1 = require("../lib/jwt/jwt");
const config_1 = require("../config");
const { content_types } = config_1.serverConfiguration;
const { createToken } = jwt_1.tokenServise;
class CommentsController {
    mainPage(req, res) { }
    ;
    comment(req, res) { }
    ;
    commentsRead(req, res) { }
    ;
    constructor() {
        this.mainPage = async (req, res) => {
            try {
                res.writeHead(200, { "content-type": 'text/html' });
                const mainHtml = await (0, readFile_1.readFilesPublic)('views/index.html');
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
        this.comment = async (req, res) => {
            try {
                let newComment = '';
                req.on("data", (chunk) => {
                    newComment += chunk;
                });
                req.on("end", async () => {
                    try {
                        let comment = JSON.parse(newComment);
                        if (comment) {
                            let comments = await (0, readFile_1.readFileComments)('comments.json');
                            let token = req.headers.token;
                            let verifyToken = jwt_1.tokenServise.verifyToken(token);
                            let users = await (0, readFile_1.readFileUsers)('users.json');
                            let user = users.find((item) => item.id == verifyToken.user_id);
                            comment = { id: comments.length ? comments.at(-1).id + 1 : 1, user_name: user?.name, ...comment };
                            comments.push(comment);
                            const checkWriteFile = await (0, writeFile_1.writeFile)('comments.json', comments);
                            if (checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({ message: 'success', status: 201 }));
                            }
                            else
                                throw new error_1.ServerError("Comment not saved");
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
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        };
        this.commentsRead = async (req, res) => {
            try {
                let commnets = await (0, readFile_1.readFileComments)('comments.json');
                res.end(JSON.stringify(commnets));
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
