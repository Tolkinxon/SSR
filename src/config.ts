import { config } from "dotenv";
import { ServerConfig } from "./types";
import path from "node:path";
config();

export const serverConfiguration:ServerConfig = {
    port: process.env.PORT || 5000,
    dbFilePath: (filePath:string) => path.resolve('db', filePath)
}