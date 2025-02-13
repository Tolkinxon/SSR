import http from "node:http"
import { serverConfiguration } from "./config";
import { METHODS } from './types' 
import authController from "./controller/auth.controller";
import JsAndCssLoadController from "./controller/JsAndCssLoad.controller";
import { chekToken } from "./models/checkToken";
import commentsController from "./controller/commentsController";
const { port } = serverConfiguration;

const server = http.createServer(async(req, res)=>{
    const reqUrl: string = (req.url as string).trim().toLowerCase();
    const reqMethod: string = (req.method as string).trim().toUpperCase();


    console.log(reqUrl);
    
    res.setHeader("Content-Type", "application/json");
    if(reqUrl.startsWith('/api/auth/login') && reqMethod == METHODS.READ) authController.loginHtml(req, res); 
    if(reqUrl.startsWith('/api/auth/register') && reqMethod == METHODS.CREATE) authController.register(req, res); 
    if(reqUrl.startsWith('/api/auth/register') && reqMethod == METHODS.READ) authController.registerHtml(req, res); 
    if(reqUrl.includes('/css') || reqUrl.includes('/js')) JsAndCssLoadController.jsAndCssLoad(req, res); 


    if(!(reqUrl.includes('/api') )&& reqMethod == METHODS.READ) {
        if(await chekToken(req, res)){
            if(reqUrl == '/') commentsController.mainPage(req, res);
        }
    }

    


})

server.listen(port, () => {
    console.log(`Server runnig on port-${port}`);
    
})