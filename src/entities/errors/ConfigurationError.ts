import APIError from "./APIError";
import IError from "./IError";
import { StatusCodes } from "../../libs/constants";

export default class ConfigurationError extends APIError {
  constructor(error: IError[]) {
    super("Configuration Error", StatusCodes.CONFLICT, error);
  }
}
