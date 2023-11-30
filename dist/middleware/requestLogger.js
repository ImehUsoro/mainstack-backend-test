"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, _res, next) => {
    const { method, url } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
};
exports.default = requestLogger;
