import { Auth } from "./controller.dto";
import  fs  from "node:fs/promises";
import { IncomingMessage, ServerResponse } from "node:http";
import { Error } from "../types";
import { globalError, ClientError } from "../utils/error";

class AuthController extends Auth {
    register(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    login(req:IncomingMessage, res: ServerResponse<IncomingMessage>):void{};
    constructor(){
        super()
        this.register = async (req, res) =>{
            try {
                let newUser:string = '';
                req.on("data", (chunk)=>{
                    newUser += chunk;
                })
                req.on("end", ()=>{
                    try{
                        let users = await fs.readFile()
                    }
                    catch (error) {
                        console.log(error);
                        
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
        this.login = async () =>{}
    }
}

export default new AuthController