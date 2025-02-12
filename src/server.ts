import http from "node:http"
import { serverConfiguration } from "./config";
import { METHODS } from './types' 
import authController from "./controller/auth.controller";
const { port } = serverConfiguration;

const server = http.createServer((req, res)=>{
    const reqUrl: string = (req.url as string).trim().toLowerCase();
    const reqMethod: string = (req.method as string).trim().toUpperCase();

    res.setHeader("Content-Type", "application/json");

    if(reqUrl.startsWith('/api/auth/register') && reqMethod == METHODS.CREATE) authController.register(req, res); 


})

server.listen(port, () => {
    console.log(`Server runnig on port-${port}`);
    
})