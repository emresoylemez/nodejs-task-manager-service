import { LocationTypes } from "./../commonValidations";
import { commonValidations } from "../commonValidations";

const validations = Object.freeze({
  password(locationType = LocationTypes.body) {
    return commonValidations.checkString("password", locationType, false);
  },
  tenantId(locationType = LocationTypes.body) {
    return commonValidations.checkString("tenantId", locationType, false);
  },
  username(locationType = LocationTypes.body) {
    return commonValidations.checkString("username", locationType, false);
  },
  token(locationType = LocationTypes.headers) {
    return commonValidations.checkString("Authorization", locationType, false);
  },
  accessToken(locationType = LocationTypes.body) {
    return commonValidations.checkString("accessToken", locationType, false);
  },
  firstName(locationType = LocationTypes.body) {
    return commonValidations.checkString("firstName", locationType, false);
  }
});

export default Object.freeze({
  signin: {
    password: validations.password(),
    tenantId: validations.tenantId(),
    username: validations.username()
  },
  signout: {
    authorization: validations.token()
  },
  signup: {
    firstName: validations.firstName()
    // TODO implement rest of the fields
  },
  validateToken: {
    authorization: validations.token()
  }
});
