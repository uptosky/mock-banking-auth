import request from "supertest";
import app from "../app";

describe(">>> Test health route", () => {
  it("should ensure that health route is configured", async done => {
    request(await app())
      .get("/health")
      .end((err, response) => {
        expect(response.body).toEqual({ healthy: true });
        return done();
      });
  });
});
