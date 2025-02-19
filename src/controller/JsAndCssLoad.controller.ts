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
        const filePath:string = reqUrl.split('/').slice(-2).join('/');

        console.log(filePath, "file path");
        
            try {
                if(reqUrl.includes('js')) res.writeHead(200, {"content-type" : 'text/javascript'});
                else if(reqUrl.includes('css')) res.writeHead(200, {"content-type" : 'text/css'});
                else { res.writeHead(200, {"Content-Type" : 'image/jpeg'});}

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