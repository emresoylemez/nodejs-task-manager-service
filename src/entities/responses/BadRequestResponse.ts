import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";
import { getEnumKeyOrValue } from "../../libs/utilities";

export default class BadRequestResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(data: IData = null, message: string = getEnumKeyOrValue(StatusCodes, StatusCodes.BAD_REQUEST)) {
    this.data = data;
    this.metadata = {
      code: StatusCodes.BAD_REQUEST,
      message,
      timestamp: new Date()
    };
  }
}
