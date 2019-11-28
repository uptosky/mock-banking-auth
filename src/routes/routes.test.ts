import request from "supertest";
import app from "../app";
import constants from "../constants";

describe(">>> Test main app", () => {
  it("should ensure bad route handled with error", async done => {
    const x = await app();
    request(x)
      .get("/foo/bar")
      .end((err, response) => {
        expect(response.body).not.toBeNull();
        expect(response.body.statusCode).toEqual(constants.HTTP_NOT_FOUND);
        expect(response.body.message).toBeDefined();

        done();
      });
  });
});
