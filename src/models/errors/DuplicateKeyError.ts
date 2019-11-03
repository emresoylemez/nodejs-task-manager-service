import DBError from "./DBError";
import { StatusCodes } from "../../libs/constants";
import { getEnumKeyOrValue } from "../../libs/utilities";

export default class DuplicateKeyError extends DBError {
  constructor(column: string, value: string = "") {
    super(
      getEnumKeyOrValue(StatusCodes, StatusCodes.UNPROCESSABLE),
      [
        {
          location: column,
          msg: "One record with this name already exist and it can not be duplicated.",
          param: column,
          value
        }
      ],
      DuplicateKeyError.name
    );
  }
}

