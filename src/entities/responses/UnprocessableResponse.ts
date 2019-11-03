import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";

export default class UnprocessableResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(data: IData = null, message: string = "") {
    this.data = data;
    this.metadata = {
      code: StatusCodes.UNPROCESSABLE,
      message,
      timestamp: new Date()
    };
  }
}
