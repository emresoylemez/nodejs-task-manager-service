import { EnvVars, StatusCodes } from "../libs/constants";
import IResponse from "../models/responses/IResponse";

import {
  DuplicateKeyError,
  UnprocessableError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ConfigurationError,
  StrapiError
} from "../models/errors";
import {
  BadRequestResponse,
  ForbiddenResponse,
  NotFoundResponse,
  UnprocessableResponse,
  InternalServerErrorResponse,
  ConfigurationErrorResponse,
  StrapiErrorResponse
} from "../models/responses";

export default function errorHandler(env: string) {
  return function(err: any, req: any, res: any, next: any) {
    if (env !== EnvVars.TEST) {
      console.error(err);
    }

    if (err.name === "MongoError") {
      err.type = "BadRequestError";
      err.data = err.message;
      err.message = "MongoError";
    }

    let response: IResponse;
    switch (err.type) {
      case DuplicateKeyError.name:
        response = new UnprocessableResponse(err.data, err.message);
        break;
      case UnprocessableError.name:
        response = new UnprocessableResponse(err.data, err.message);
        break;
      case BadRequestError.name:
        response = new BadRequestResponse(err.data, err.message);
        break;
      case ForbiddenError.name:
        response = new ForbiddenResponse(err.message);
        break;
      case NotFoundError.name:
        response = new NotFoundResponse(err.message);
        break;
      case ConfigurationError.name:
        response = new ConfigurationErrorResponse(err.data);
        break;
      case StrapiError.name:
        response = new StrapiErrorResponse(err.message, err.status);
        break;
      case InternalServerErrorResponse.name:
      default:
        response = new InternalServerErrorResponse(err.data, err.isPublic ? err.message : StatusCodes[err.status]);
        break;
    }

    res.locals.response = response;
    res.locals.outcome = "failed";

    res.status(response.metadata.code).json(response);
  };
}
