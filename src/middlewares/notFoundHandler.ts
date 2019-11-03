import { NextFunction, Request, Response } from "express";

import { NotFoundError } from "../entities/errors";


export default (req: Request, res: Response, next: NextFunction) => {
  next( new NotFoundError([]) );
};
