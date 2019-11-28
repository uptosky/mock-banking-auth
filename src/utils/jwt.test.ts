import httpMocks from "node-mocks-http";
import jwtUtil from "./jwt";
import constants from "../constants";

describe(">>> Test utils", () => {
  it("should confirm getJWTFromHeader function returns false when no Authorization header", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = jwtUtil.getJWTFromHeader(req);
    expect(result).toBeUndefined();
  });

  it("should confirm getJWTFromHeader function returns false when no JWT in Authorization header", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer: this-aint-no-JWT"
      }
    });
    const result = jwtUtil.getJWTFromHeader(req);
    expect(result).toBeUndefined();
  });

  it("should confirm getJWTFromHeader function returns false when bearer pattern has more than one space", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer    <-unacceptable.bearer.pattern"
      }
    });
    const result = jwtUtil.getJWTFromHeader(req);
    expect(result).toBeUndefined();
  });

  it("should confirm getJWTFromHeader function returns JWT, stripped of extra end bits when JWT pattern match in Authorization header", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer acceptable.jwt.pattern.XXX"
      }
    });
    const result = jwtUtil.getJWTFromHeader(req);
    expect(result).toEqual("acceptable.jwt.pattern");
  });

  it("should confirm getJWTFromHeader function returns JWT when JWT pattern match in Authorization header", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer acceptable.jwt.pattern"
      }
    });
    const result = jwtUtil.getJWTFromHeader(req);
    expect(result).toEqual("acceptable.jwt.pattern");
  });

  it("should confirm getAuth0UserId function returns auth0 user id from JWT", () => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${constants.TEST_JWT}`
      }
    });
    const result = jwtUtil.getAuth0UserID(req);
    expect(result).toEqual("gMFGOmu0158P9npTUMsaXod8HP3N3FqJ@clients");
  });
});
