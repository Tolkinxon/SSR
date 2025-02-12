import { User } from "../types";
import fs from "node:fs/promises"
import { serverConfiguration } from "../config";
const { dbFilePath } = serverConfiguration;


export const readFileUsers = async (fileName:string):Promise<[] | User[]> => {
    let users:User[] | string = await fs.readFile(dbFilePath(fileName), 'utf-8');
    return users ? JSON.parse(users) : [];
}