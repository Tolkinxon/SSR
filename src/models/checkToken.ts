import { IncomingMessage, ServerResponse } from "http";
import { Error, User } from "../types";
import { ClientError, globalError } from "../utils/error";
import { tokenServise } from "../lib/jwt/jwt";
import { TokenBody } from "../lib/jwt/jwt.dto";
import { readFileUsers } from "../models/readFile";



export const chekToken = async (req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    try {
        let token = req.headers.token;
        if(!token) throw new ClientError('Unauthorized', 401);
        let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;

        let users = await readFileUsers('users.json');
        if(!(users.some((item:User)=> item.id == verifyToken.user_id))) throw new ClientError('Token is invalid', 401);
        if(!(req.headers['user-agent'] == verifyToken.userAgent)) throw new ClientError('Token is invalid', 401);
        return true
    }
    catch(error){
        let err:Error = {
            message: (error as Error).message,
            status: (error as Error).status
        };
        globalError(res, err);
    }
}