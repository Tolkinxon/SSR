import { User } from "../types";
import fs from "node:fs/promises"
import { serverConfiguration } from "../config";
const { dbFilePath, publicFilePath } = serverConfiguration;


export const readFileUsers = async (fileName:string):Promise<[] | User[]> => {
    let users:User[] | string = await fs.readFile(dbFilePath(fileName), 'utf-8');
    return users ? JSON.parse(users) : [];
}

export const readFilesPublic = async (fileName:string):Promise<string | Buffer> => {
    if(fileName.includes('img')){
        let publicFile:User[] | string |Buffer = await fs.readFile(publicFilePath(fileName));
        return publicFile;
    } else {
        let publicFile:User[] | string = await fs.readFile(publicFilePath(fileName), 'utf-8');
        return publicFile;
    }

    
}