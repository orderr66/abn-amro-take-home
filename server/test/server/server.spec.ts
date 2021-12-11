import request from "supertest";
import { expect } from "chai";

import createServer from "server";

const app = createServer();

describe("server check", function () {
  it("server is created witout error", done => {
    request(app).get("/").expect(200, done);
  })
})