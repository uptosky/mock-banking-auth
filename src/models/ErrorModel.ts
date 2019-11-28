import constants from "../constants";

export default class ErrorModel {
  statusCode: number;
  code: string;
  message: string;

  constructor(data?: ErrorModel) {
    Object.assign(this, data);
  }

  public static get GeneralError() {
    return new ErrorModel({
      statusCode: constants.HTTP_SERVER_ERROR,
      code: constants.ERROR_GENERIC,
      message: `We're afraid something went wrong...`
    });
  }

  public static GeneralErrorWithMessage(message: string) {
    return new ErrorModel({
      statusCode: constants.HTTP_SERVER_ERROR,
      code: constants.ERROR_GENERIC,
      message
    });
  }

  public static get PermissionDeniedError() {
    return new ErrorModel({
      statusCode: constants.HTTP_FORBIDDEN,
      code: constants.ERROR_FORBIDDEN,
      message: `Permission Denied.`
    });
  }

  public static get NotFoundError() {
    return new ErrorModel({
      statusCode: constants.HTTP_SERVER_ERROR,
      code: constants.ERROR_RESOURCE_NOT_FOUND,
      message: `Resource Not Found.`
    });
  }
}
