import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";
import { getEnumKeyOrValue } from "../../libs/utilities";


export default class NotFoundResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(
    message: string = getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND)
  ) {
    this.data = null;
    this.metadata = {
      code: StatusCodes.NOT_FOUND,
      message,
      timestamp: new Date()
    };
  }
}
