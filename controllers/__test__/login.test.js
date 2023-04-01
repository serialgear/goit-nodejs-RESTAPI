require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST } = process.env;

describe("Test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    console.log("Test database connection successful");
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  test("should login a user", async () => {
    await request(app).post("/users/register").send({
      email: "user@gmail.com",
      password: "123456",
      subscription: "pro",
    });

    const response = await request(app).post("/users/login").send({
      email: "user@gmail.com",
      password: "123456",
    });

    const { token, user } = response.body;

    expect(response.status).toEqual(200);
    expect(user).toBeDefined();
    expect(token).toBeDefined();
    expect(user.email).toEqual(expect.any(String));
    expect(user.subscription).toEqual(expect.any(String));
  });
});
