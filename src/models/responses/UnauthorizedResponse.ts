import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";

export default class UnauthorizedResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(data: IData = null, message: string = "") {
    this.data = data;
    this.metadata = {
      code: StatusCodes.UNAUTHORIZED,
      message,
      timestamp: new Date()
    };
  }
}
