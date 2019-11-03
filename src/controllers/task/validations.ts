import { RequestLocations } from "../../libs/constants";
import { commonValidations } from "../commonValidations";

const validations = Object.freeze({
  task(locationType = RequestLocations.body) {
    return commonValidations.checkString("task", locationType, false);
  },
  token(locationType = RequestLocations.headers) {
    return commonValidations.checkString("Authorization", locationType, false);
  }
});

export default Object.freeze({
  create: {
    authorization: validations.token(),
    task: validations.task()
  },
  list: {
    authorization: validations.token()
  }
});
