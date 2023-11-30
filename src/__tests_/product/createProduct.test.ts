import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../..";

describe("POST /register", () => {
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
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
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

    const res = await request(app).post("/api/v1/user/register").send({
      email: "test@test.com",
      password: "password",
      firstName: "Test",
      lastName: "User",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("User with this email already exists");
  });
});
