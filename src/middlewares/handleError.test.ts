import httpMocks from "node-mocks-http";
import handleError from "./handleError";
import ErrorModel from "../models/ErrorModel";

describe(">>> Test error handler middleware", () => {
  it("should confirm error response", () => {
    // Arrange
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const err = new ErrorModel({
      statusCode: 500,
      code: "ERROR_CODE",
      message: "error message"
    }); // { message: 'Simple text error message.' };

    // Act
    handleError(err, req, res, () => {
      throw new Error("Error Handler should return error but failed");
    });

    // Assert
    expect(res.statusCode).toEqual(500);
    expect(res._getData()).toEqual({
      "x-correlation-id": undefined,
      statusCode: 500,
      code: "ERROR_CODE",
      message: "error message"
    });
  });
});
