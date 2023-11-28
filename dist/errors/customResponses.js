"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const BadRequest = (res, message) => {
    return res.status(400).json({ status: "error", error: message });
};
exports.BadRequest = BadRequest;
