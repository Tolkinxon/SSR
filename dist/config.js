"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfiguration = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.serverConfiguration = {
    port: process.env.PORT || 5000
};
