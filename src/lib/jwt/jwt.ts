import { verify, sign } from "jsonwebtoken";
import { tokenServiseInterface } from "./jwt.dto";

export const tokenServise:tokenServiseInterface = {
    createToken: (payload:object) => sign(payload, process.env.TOKEN_KEY as string, {expiresIn: "5d"}),
    verifyToken: (token:string) => verify(token, process.env.TOKEN_KEY as string)
}