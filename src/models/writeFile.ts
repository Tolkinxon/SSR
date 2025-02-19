import { User, Comment } from "../types";
import { serverConfiguration } from "../config";
import fs from "node:fs/promises";
const { dbFilePath, publicImgPath } = serverConfiguration;

export const writeFile = async (fileName:string, body:(User | Comment)[]):Promise<boolean> => {
    await fs.writeFile(dbFilePath(fileName), JSON.stringify(body, null, 4));
    return true 
}  

export const writeFileImg = async (fileName:string, body:Buffer):Promise<boolean> => {
    await fs.writeFile(publicImgPath(fileName), body);
    return true 
}  