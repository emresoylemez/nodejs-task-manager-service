import { Router } from "express";
import { checkSchema } from "express-validator/check";

import validations from "./validations";
import userControllerInstance from "./TaskController";
import validationHandler from "../../middlewares/validationHandler";
import controllerAdapter from "../../middlewares/controllerAdapter";

const router = Router();
const v1 = "/v1";
router
  .route(v1 + "/me/create")
  .post(checkSchema(validations.create as any), validationHandler(), controllerAdapter(userControllerInstance, "create"));
router.route(v1 + "/me/list").post(checkSchema(validations.list as any), validationHandler(), controllerAdapter(userControllerInstance, "list"));

export default router;
