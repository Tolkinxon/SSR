import { User } from "../types";
import { serverConfiguration } from "../config";
import fs from "node:fs/promises";
const { dbFilePath } = serverConfiguration;

export const writeFile = async (fileName:string, body:User[]):Promise<boolean> => {
    await fs.writeFile(dbFilePath(fileName), JSON.stringify(body, null, 4));
    return true 
}   