"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registorValidator = void 0;
const error_1 = require("./error");
let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const registorValidator = (user) => {
    const { name, email, password } = user;
    if (!email)
        throw new error_1.ClientError("email required!", 400);
    if (!name)
        throw new error_1.ClientError("name required!", 400);
    if (!password)
        throw new error_1.ClientError("password required!", 400);
    if (!emailRegExp.test(email))
        throw new error_1.ClientError("incorrect email!", 400);
    if (!passwordRegex.test(password))
        throw new error_1.ClientError("incorrect password!", 400);
    return true;
};
exports.registorValidator = registorValidator;
const loginValidator = (user) => {
    const { email, password } = user;
    if (!email)
        throw new error_1.ClientError("email required!", 400);
    if (!password)
        throw new error_1.ClientError("password required!", 400);
    if (!emailRegExp.test(email))
        throw new error_1.ClientError("incorrect email!", 400);
    if (!passwordRegex.test(password))
        throw new error_1.ClientError("incorrect password!", 400);
    return true;
};
exports.loginValidator = loginValidator;
