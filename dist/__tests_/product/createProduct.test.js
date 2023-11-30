"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = require("../..");
exports.url = "/api/v1/user";
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoServer.stop();
}));
describe("POST /register", () => {
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post(`${exports.url}/register`).send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Successfully created a new User");
    }));
    it("should not allow duplicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.app).post("/register").send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        const res = yield (0, supertest_1.default)(__1.app).post(`${exports.url}/register`).send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("User with this email already exists");
    }));
});
// Login
describe("POST /login", () => {
    it("should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.app).post(`${exports.url}/register`).send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        const res = yield (0, supertest_1.default)(__1.app).post(`${exports.url}/login`).send({
            email: "test@test.com",
            password: "password",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("Login successful");
    }));
    it("should return a 401 if email is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.app).post("/register").send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        const res = yield (0, supertest_1.default)(__1.app).post(`${exports.url}/login`).send({
            email: "test123@test.com",
            password: "password",
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual("Invalid credentials");
    }));
    it("should return a 401 if password don't match", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.app).post("/register").send({
            email: "test@test.com",
            password: "password",
            firstName: "Test",
            lastName: "User",
        });
        const res = yield (0, supertest_1.default)(__1.app).post(`${exports.url}/login`).send({
            email: "test@test.com",
            password: "password123",
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual("Invalid credentials");
    }));
});
