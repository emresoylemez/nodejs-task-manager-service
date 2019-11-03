import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";


export default class StrapiErrorResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(
    message: string = "",
    code
  ) {
    this.data =  null;
    this.metadata = {
      code: code || StatusCodes.FORBIDDEN,
      message,
      timestamp: new Date()
    };
  }
}
