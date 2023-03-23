import axios from "axios";
import { describe, it, before } from "mocha";
import { expect } from "chai";
const login = require("../helpers/login");

describe("Authorization", () => {
  describe("Successful login", () => {
    let response;
    let token;
    before(async () => {
      response = await login(process.env.LOGIN, process.env.PASSWORD);
    });
    it("Status code is 200", () => {
      expect(response.status).to.eq(200);
    });
    it("Response returns a token", () => {
      expect(response.data.token).to.be.a("string");
      token = response.data.token;
    });
  });
  describe("Unsuccessful login", () => {
    it("Status code is 404 - invalid credentials", async () => {
      let response = await axios.post(
        `${process.env.BASE_URL}/auth`,
        {
          login: "somelogin",
          password: "somepassword",
        },
        {
          validateStatus: () => true,
        }
      );
      expect(response.status).to.eq(404);
    });
    it("Status code is 400 - missing credentials", async () => {
      let response = await axios.post(
        `${process.env.BASE_URL}/auth`,
        {
          login: "adminius",
        },
        {
          validateStatus: () => true,
        }
      );
      expect(response.status).to.eq(400);
    });
  });
});
