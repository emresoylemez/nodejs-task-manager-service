import APIError from "./APIError";
import IError from "./IError";
import { StatusCodes } from "../../libs/constants";


export default class NotFoundError extends APIError {
  constructor(errors: IError[]) {
    super("Page Not found", StatusCodes.NOT_FOUND, errors, NotFoundError.name);
  }
}
