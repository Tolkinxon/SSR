import { Auth } from "./controller.dto";
import  fs  from "node:fs/promises";
import { IncomingMessage, ServerResponse } from "node:http";
import { Error, User } from "../types";
import { globalError, ClientError, ServerError } from "../utils/error";
import { readFilesPublic, readFileUsers } from "../models/readFile";
import { registorValidator, loginValidator } from "../utils/validator";
import { writeFile, writeFileImg } from "../models/writeFile";
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
                let newUser: Array<Buffer | User> = [];
                req.on("data", (chunk)=>{
                    newUser.push(chunk);
                })
                req.on("end", async ()=>{
                    try{
                        const combinedBuffer = Buffer.concat(newUser as Buffer[]);

                        const lines = Buffer.from('\r\n\r\n')
                        const positionLines = combinedBuffer.lastIndexOf(lines);
                        const boundary = req.headers['content-type']?.split('boundary=')[1];

                        let user: string | string[] = combinedBuffer.subarray(0, positionLines).toString('utf-8').split((boundary as string) + '\r\nContent-Disposition: form-data; name=');
                        let imgBuffer = combinedBuffer.subarray(positionLines+4);
                        const extention = user[4].split('\r\n')[1].split(' ')[1].split('/')[1];

                        let userObj:User = {
                            name: user[1].split('\r\n')[2],
                            email: user[2].split('\r\n')[2],
                            password: user[3].split('\r\n')[2],
                            image: extention
                        }

                        
                        const validator = registorValidator(userObj);
                        if(validator){
                            let users:User[] = await readFileUsers('users.json');
                            if(users.some((item:User) => item.email == userObj.email)) throw new ClientError('This user avialable!', 400);
                            userObj = {id: users.length ? (((users as User[]).at(-1) as User).id as number) + 1 : 1, ...userObj};
                            userObj.image = `/img/${userObj.id}.${extention}`;
                            
                            const uploadImg = await writeFileImg(`${userObj.id}.${extention}`, imgBuffer);
                            if(uploadImg) users.push(userObj);
                            else throw new ServerError("Image not saved");
                            
                            const checkWriteFile = await writeFile('users.json', users); 
                            if(checkWriteFile) {
                                res.statusCode = 201;
                                res.end(JSON.stringify({message: 'success', status: 201, user_name: userObj.name, user_img:userObj.image, accessToken: createToken({user_id:userObj.id,  userAgent: req.headers["user-agent"]})}))
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
        this.login = async (req, res) =>{
            try {
                let dataUser:string = '';
                req.on("data", (chunk)=>{
                    dataUser += chunk;
                })
                req.on("end", async ()=>{
                    try{
                        let user:User = JSON.parse(dataUser)
                        const validator = loginValidator(user);
                        if(validator){
                            let users:User[] = await readFileUsers('users.json');
                            let foundUser:User | undefined = users.find((item:User)=> item.email == user.email);
                            if(foundUser) {
                                if(foundUser.password == user.password){
                                res.statusCode = 201;
                                  return  res.end(JSON.stringify({message: 'success', user_name: foundUser.name, status: 201, user_img: foundUser.image, accessToken: createToken({user_id:foundUser?.id, userAgent: req.headers["user-agent"]})}))
                                }
                                else{ 
                                    res.statusCode = 400;
                                    return  res.end(JSON.stringify({message: 'Password incorrect', status: 400}))
                                }
                            } else{ 
                                res.statusCode = 400;
                                return res.end(JSON.stringify({message: 'Email incorrect', status: 400}))
                            }
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

export default new AuthController;