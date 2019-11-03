import APIError from "./APIError";
import IError from "./IError";
import { StatusCodes } from "../../libs/constants";

export default class ForbiddenError extends APIError {
  constructor(errors: IError[]) {
    super(errors[0] ? errors[0].msg : "Forbidden", StatusCodes.FORBIDDEN, errors, ForbiddenError.name);
  }
}
