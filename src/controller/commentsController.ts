import { Auth } from "./controller.dto";
import  fs  from "node:fs/promises";
import { IncomingMessage, ServerResponse } from "node:http";
import { Error, User } from "../types";
import { globalError, ClientError, ServerError } from "../utils/error";
import { readFilesPublic, readFileUsers } from "../models/readFile";
import { registorValidator } from "../utils/validator";
import { writeFile } from "../models/writeFile";
import { tokenServise } from "../lib/jwt/jwt";
import { serverConfiguration } from "../config";
const { content_types } = serverConfiguration;
const { createToken } = tokenServise;

class CommentsController {
    mainPage(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    constructor(){        
        this.mainPage = async (req, res) => {
            try {
                res.writeHead(200, {"content-type" : 'text/html'});
                const mainHtml = await readFilesPublic('views/index.html');
                return res.end(mainHtml);
            } catch (error) {
                let err:Error = {
                    message: (error as Error).message,
                    status: (error as Error).status
                }
                globalError(res, err); 
            }
        }
    }
}

export default new CommentsController;