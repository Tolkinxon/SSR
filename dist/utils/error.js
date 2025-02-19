"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = exports.ServerError = exports.ClientError = void 0;
class ClientError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.message = `ClientError: ${message}`;
        this.status = status;
    }
}
exports.ClientError = ClientError;
class ServerError extends Error {
    status;
    constructor(message) {
        super();
        this.message = `ServerError: ${message}`;
        this.status = 500;
    }
}
exports.ServerError = ServerError;
const globalError = (res, err) => {
    const status = err.status || 500;
    res.statusCode = status;
    res.end(JSON.stringify({ message: err.message, status }));
};
exports.globalError = globalError;
