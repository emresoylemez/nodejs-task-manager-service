import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";


export default class InternalServerErrorResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(
    data: IData = null,
    message: string = ""
  ) {
    this.data = data;
    this.metadata = {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      timestamp: new Date()
    };
  }
}
