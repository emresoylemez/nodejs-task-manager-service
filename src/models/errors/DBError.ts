import { StatusCodes } from "../../libs/constants";
import BaseError from "./BaseError";
import IError from "./IError";


/**
 * Class representing an API error.
 * @extends BaseError
 */
class DBError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {IError[]} data - error details.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message: string,
    data: IError[] = [],
    type: string = DBError.name
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, data, type, false);
  }
}

export default DBError;
