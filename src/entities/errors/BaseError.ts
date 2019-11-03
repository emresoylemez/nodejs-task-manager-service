import IError from "./IError";

/**
 * @extends Error
 */
export default abstract class BaseError extends Error {
  public isOperational: boolean;
  constructor(
    public message: string,
    public status: number,
    public data: IError[],
    public type: string,
    public isPublic: boolean
  ) {
    super(message);

    this.isOperational = true; // This is required since bluebird 4 doesn"t append it anymore.

    Error.captureStackTrace(this, this.constructor);
  }
}
