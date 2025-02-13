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

class AuthController extends Auth {
    register(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    registerHtml(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    login(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    loginHtml(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    constructor(){
        super()
        this.register = async (req, res) =>{
            try {
                let newUser:string = '';
                req.on("data", (chunk)=>{
                    newUser += chunk;
                })
                req.on("end", async ()=>{
                    try{
                        let user:User = JSON.parse(newUser)
                        const validator = registorValidator(user);
                        if(validator){
                            let users:User[] = await readFileUsers('users.json');
                            if(users.some((item:User) => item.email == user.email)) throw new ClientError('This user avialable!', 400);
                            user = {id: users.length ? (((users as User[]).at(-1) as User).id as number) + 1 : 1, ...user};
                            users.push(user);
                            const checkWriteFile = await writeFile('users.json', users); 
                            if(checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({message: 'success', status: 201, accessToken: createToken({user_id:user.id, userAgent: req.headers["user-agent"]})}))
                            }
                            else throw new ServerError("User not saved");
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
                console.log(error);
                
                let err:Error = {
                    message: (error as Error).message,
                    status: (error as Error).status
                }
                globalError(res, err);                
            }
        }
        this.registerHtml = async (req, res) => {
            try {
                res.writeHead(200, {"content-type" : 'text/html'});
                const registerHtml = await readFilesPublic('views/register.html');
                return res.end(registerHtml);
            } catch (error) {
                let err:Error = {
                    message: (error as Error).message,
                    status: (error as Error).status
                }
                globalError(res, err); 
            }
        }
        this.login = async () =>{}
        this.loginHtml = async (req, res) => {
            try {
                res.writeHead(200, {"content-type" : 'text/html'});
                const loginHtml = await readFilesPublic('views/login.html');
                return res.end(loginHtml);
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

export default new AuthController