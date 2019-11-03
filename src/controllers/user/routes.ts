import { Router } from "express";
import { checkSchema } from "express-validator/check";

import validations from "./validations";
import userControllerInstance from "./UserController";
import validationHandler from "../../middlewares/validationHandler";
import controllerAdapter from "../../middlewares/controllerAdapter";

const router = Router();
const v1 = "/v1"
router.route(v1 + "/signin").post(checkSchema(validations.signin as any), validationHandler(), controllerAdapter(userControllerInstance, "signin"));
router.route(v1 + "/signout").post(checkSchema(validations.signout as any), validationHandler(), controllerAdapter(userControllerInstance, "signout"));
router.route(v1 + "/signup").post(checkSchema(validations.signup as any), validationHandler(), controllerAdapter(userControllerInstance, "signup"));
router.route(v1 + "/validateToken").post(checkSchema(validations.validateToken as any), validationHandler(), controllerAdapter(userControllerInstance,
  "validateToken"));

export default router;
