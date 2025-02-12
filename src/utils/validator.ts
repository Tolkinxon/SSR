import { User } from "../types";
import { ClientError } from "./error";

let emailRegExp:RegExp =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


export const registorValidator = (user:User): boolean => {
    const { name, email, password } = user;

    if(!email) throw new ClientError("email required!", 400);
    if(!name) throw new ClientError("name required!", 400);
    if(!password) throw new ClientError("password required!", 400);
    if(!emailRegExp.test(email)) throw new ClientError("incorrect email!", 400);
    if(!passwordRegex.test(password)) throw new ClientError("incorrect password!", 400);

    return true;
}