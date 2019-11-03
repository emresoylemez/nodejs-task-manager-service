import { StatusCodes } from "../../libs/constants";
import BaseError from "./BaseError";
import IError from "./IError";


/**
 * Class representing an API error.
 * @extends BaseError
 */
export default class APIError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message: string,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
    data: IError[] = [],
    type: string = APIError.name,
    isPublic: boolean = false
  ) {
    super(message, status, data, type, isPublic);
  }
}
