import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";
import { getEnumKeyOrValue } from "../../libs/utilities";

export default class ForbiddenResponse implements IResponse {
  public data: IData;
  public metadata: IMetadata;

  constructor(
    message: string = getEnumKeyOrValue(StatusCodes, StatusCodes.FORBIDDEN)
  ) {
    this.data = null;
    this.metadata = {
      code: StatusCodes.FORBIDDEN,
      message,
      timestamp: new Date()
    };
  }
}
