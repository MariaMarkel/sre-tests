import axios  from "axios";
import { describe, it, before } from "mocha";
import { expect } from "chai";
import { create }  from "../helpers/user/create";
let response;
let userId: number;
let alreadyDeletedUserId = "1052278b-7029-45fd-88c3-631947395d30";

describe("Create new user", () => {
  before(async () => {
    response = await create();
  });
  it("Status code is 200", async () => {
    expect(response.status).to.eq(200);
  });
  it("Response returns id", () => {
    expect(response.data.id.length).not.to.eq(0);
    userId = response.data.id;
  });
  it("Response returns correct amount", () => {
    expect(response.data.amount).to.eq(1000);
  });
});

describe("Get all users", () => {
  let userIds;
  before(async () => {
    response = await axios.get(`${process.env.BASE_URL}/users`, {
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
  });
  it("Status code is 200", () => {
    expect(response.status).to.eq(200);
  });
  it("Response returns more than 1 users", () => {
    expect(response.data.length).to.be.gte(1);
  });
  it(`Response includes new user Id ${userId}`, () => {
    userIds = response.data.map(el => el.id);
    expect(userIds[userIds.length-1]).to.eq(userId);
  });
});

describe("Delete user", () => {
  before(async () => {
    response = await axios.delete(`${process.env.BASE_URL}/users`, 
    {
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: {
        id: userId
      }
    });
  });
  it(`Status code is 200 - user with Id ${userId} deleted`, () => {
    expect(response.status).to.eq(200);
  });
  it("Response returns correct error message", () => {
    expect(response.data.message).to.eq("User deleted.");
  });
});

describe(`Same user with Id ${alreadyDeletedUserId} cannot be deleted again`, () => {
  before(async () => {
    response = await axios.delete(`${process.env.BASE_URL}/users`, 
    {
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: {
        id: alreadyDeletedUserId
      },
      validateStatus: () => true
    });
  });
  it("Status code is 400", () => {
    expect(response.status).to.eq(400);
  });
  it("Response returns correct error message", () => {
    expect(response.data.message).to.eq("No user found.");
  });
});

describe("Non-existent user cannot be deleted", () => {
  before(async () => {
    response = await axios.delete(`${process.env.BASE_URL}/users`, 
    {
      headers: {
        authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: {
        id: "someUserId"
      },
      validateStatus: () => true
    });
  });
  it("Status code is 400", () => {
    expect(response.status).to.eq(400);
  });
  it("Response returns correct error message", () => {
    expect(response.data.message).to.eq("No user found.");
  });
});

