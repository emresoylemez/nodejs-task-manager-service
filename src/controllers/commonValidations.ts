import { isValidObjectId, isValidArrayOfIds, isValidArrayOfStrings } from "../libs/utilities";

export enum LocationTypes {
  body = "body",
  // cookies="cookies",
  headers = "headers",
  params = "params",
  query = "query"
}

export const commonValidations = Object.freeze({
  checkNumber(paramName, locationType = LocationTypes.params, isOptional = true) {
    return {
      in: [locationType],
      optional: isOptional,
      custom: {
        options: id => {
          const regex = RegExp(/\d/);
          return regex.test(id);
        },
        errorMessage: `${paramName} should be a number!`
      }
    };
  },
  checkObjectId(paramName, locationType = LocationTypes.params, isOptional = true) {
    return {
      in: [locationType],
      optional: isOptional,
      custom: {
        options: (id: string) => isValidObjectId(id),
        errorMessage: `${paramName} should be an ObjectId!`
      }
    };
  },
  checkObjectIds(paramName, locationType = LocationTypes.body, isOptional = true) {
    return {
      in: [locationType],
      errorMessage: `${paramName} should be an array of ObjectIds!`,
      optional: isOptional,
      isArray: true,
      custom: {
        options: (ids: string[]) => isValidArrayOfIds(ids),
        errorMessage: `${paramName} Bad Format!`
      }
    };
  },
  checkString(paramName, locationType, isOptional = true) {
    return {
      in: [locationType],
      errorMessage: `${paramName} should be a string!`,
      optional: isOptional,
      isString: true
    };
  },
  checkStrings(paramName, locationType = LocationTypes.body, isOptional = true) {
    return {
      in: [locationType],
      errorMessage: `${paramName} should be an Array of strings!`,
      optional: isOptional,
      isArray: true,
      custom: {
        options: (names: string[]) => isValidArrayOfStrings(names),
        errorMessage: `${paramName} should be a string!`
      }
    };
  }
});
