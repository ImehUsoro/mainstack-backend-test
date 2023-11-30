import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../..";

export const url = "/api/v1/user";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.connection.close();

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /register", () => {
  it("should create a new user", async () => {
    const res = await request(app).post(`${url}/register`).send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("Successfully created a new User");
  });

  it("should not allow duplicate emails", async () => {
    await request(app).post("/register").send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    const res = await request(app).post(`${url}/register`).send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("User with this email already exists");
  });
});

// Login

describe("POST /login", () => {
  it("should login a user", async () => {
    await request(app).post(`${url}/register`).send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    const res = await request(app).post(`${url}/login`).send({
      email: "test@test.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("Login successful");
  });

  it("should return a 401 if email is not found", async () => {
    await request(app).post("/register").send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    const res = await request(app).post(`${url}/login`).send({
      email: "test123@test.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual("Invalid credentials");
  });

  it("should return a 401 if password don't match", async () => {
    await request(app).post("/register").send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    const res = await request(app).post(`${url}/login`).send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual("Invalid credentials");
  });
});
