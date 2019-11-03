import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";


export default class SuccessResponse implements IResponse {
  constructor(
    public data: IData = null,
    public metadata: IMetadata = { code: StatusCodes.OK, message: "Success", timestamp: new Date() }
  ) {
  }
}
