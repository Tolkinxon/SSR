import { JwtPayload } from "jsonwebtoken";

export type TokenBody = {
    user_id: number,
    userAgent: string
}

export interface tokenServiseInterface {
    createToken: (payload:object) => string,
    verifyToken: (token:string) => JwtPayload | string | TokenBody
}