import { validationResult } from "express-validator/check";

import { UnprocessableError } from "../models/errors";
import IError from "../models/errors/IError";

export default function validationHandler() {
  return (req: any, res: any, next: any) => {
    if (res.locals.isHit) {
      return next();
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // logger.info("Inside Controller Handler", errors);
      return next(new UnprocessableError(errors.array() as IError[]));
    }

    next();
  };
}
