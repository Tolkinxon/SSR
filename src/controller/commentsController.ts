import { Auth } from "./controller.dto";
import  fs  from "node:fs/promises";
import { IncomingMessage, ServerResponse } from "node:http";
import { Error, User, Comment } from "../types";
import { globalError, ClientError, ServerError } from "../utils/error";
import { readFilesPublic, readFileUsers, readFileComments } from "../models/readFile";
import { registorValidator } from "../utils/validator";
import { writeFile } from "../models/writeFile";
import { tokenServise } from "../lib/jwt/jwt";
import { serverConfiguration } from "../config";
import { TokenBody } from "../lib/jwt/jwt.dto";
const { content_types } = serverConfiguration;
const { createToken } = tokenServise;

class CommentsController {
    mainPage(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    comment(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    commentsRead(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
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
        this.comment = async (req, res) => {
            try {
                let newComment:string = '';
                req.on("data", (chunk)=>{
                    newComment += chunk;
                })
                req.on("end", async ()=>{
                    try{
                        let comment:Comment = JSON.parse(newComment)
                        if(comment){
                            let comments:Comment[] = await readFileComments('comments.json');
                            let token = req.headers.token;
                            let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;
                            let users = await readFileUsers('users.json');
                            let user: User | undefined = users.find((item: User) => item.id == verifyToken.user_id);

                            comment = {id: comments.length ? (((comments as Comment[]).at(-1) as Comment).id as number) + 1 : 1, user_name: user?.name, ...comment};

                            comments.push(comment);
                            const checkWriteFile = await writeFile('comments.json', comments); 
                            if(checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({message: 'success', status: 201}))
                            }
                            else throw new ServerError("Comment not saved");
                        } else res.end(JSON.stringify({message: 'Incorrect'}));  
                    }
                    catch (error) {
                        let err:Error = {
                            message: (error as Error).message,
                            status: (error as Error).status
                        }
                        globalError(res, err);                
                    }
                })
            } catch (error) {
                let err:Error = {
                    message: (error as Error).message,
                    status: (error as Error).status
                }
                globalError(res, err);                
            }
        }

        this.commentsRead = async (req, res) => {
            try {
                let commnets: Comment[] = await readFileComments('comments.json');
                res.end(JSON.stringify(commnets))
                
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