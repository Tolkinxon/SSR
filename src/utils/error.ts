import { Error } from "../types";
import { IncomingMessage, ServerResponse } from "node:http";



export class ClientError extends Error {
    status:number;
    constructor(message:string, status:number){
        super(message)
        this.message = `ClientError: ${message}`;
        this.status = status
    }
}

export class ServerError extends Error {
    status: number;
    constructor(message:string){
        super()
        this.message = `ServerError: ${message}`;
        this.status = 500;
    }
}


export const globalError = (res:ServerResponse<IncomingMessage>, err:Error) => {
    const status = err.status || 500;
    res.statusCode = status;
    res.end(JSON.stringify({message: err.message, status}))
}