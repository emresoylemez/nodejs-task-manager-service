import { validationResult } from "express-validator/check";

import { UnprocessableError } from "../entities/errors";
import IError from "../entities/errors/IError";

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
