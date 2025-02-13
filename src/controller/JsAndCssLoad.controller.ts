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

class JsAndCssLoadController {
    jsAndCssLoad(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    constructor(){
        
        this.jsAndCssLoad = async (req, res) => {
        const reqUrl:string = (req.url as string).trim().toLowerCase();
        const filePath = reqUrl.slice(1);
        const headerName:string = reqUrl.split('/')[1]

            try {
                if(headerName == 'js') res.writeHead(200, {"content-type" : 'text/javascript'});
                else res.writeHead(200, {"content-type" : 'text/css'});

                const jsAndCssFile = await readFilesPublic(filePath);
                return res.end(jsAndCssFile);
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

export default new JsAndCssLoadController