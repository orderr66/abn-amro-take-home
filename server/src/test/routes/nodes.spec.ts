import request  from "supertest";
import createServer from "server";

const app = createServer();

describe("Node Routes Tests", () => {

  it("GET /nodes endpoint should return all nodes", done => {
    request(app).get("/nodes").expect(200,done)
  })

  it("POST /nodes endpoint should respond with 200", done => {
    request(app).post("/nodes").expect(200,done)
  })
})