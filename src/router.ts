import { Router } from "express";

import userRouter from "./controllers/task/routes";

import * as appInfo from "pjson";
/**
 * @swagger
 * securityDefinitions:
 *  APIKeyHeader:
 *    type: apiKey
 *    in: header
 *    name: Authorization
 */
const router = Router();
//#region [swagger: /health-check]
/**
 * @swagger
 * /health-check:
 *   get:
 *     security:
 *       - APIKeyHeader: []
 *     tags:
 *       - General
 *     description: Health Check
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: I am OK
 */
//#endregion
router.get("/health-check", (req, res) => {
  res.status(200).send("I am OK");
});

//#region [swagger: /version]
/**
 * @swagger
 * /version:
 *   get:
 *     tags:
 *       - General
 *     description: Get Version
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Version Response
 *         schema:
 *           type: object
 *           properties:
 *             version:
 *               type: string
 *               description: Version of the API.
 *             description:
 *               type: string
 *               description: Description of the API.
 *             name:
 *               type: string
 *               description: Name of the API.
 */
//#endregion
router.get("/version", (req, res) => {
  const { version, name, description } = appInfo;

  console.info(`version = ${version}, name = ${name}, description = ${description}`);

  if (!(typeof version && version)) {
    console.error("An error occurred while trying to get version: Version not defined");
    res.status(400).send(new Error("Version not defined"));
  }

  res.json({
    description,
    name,
    version
  });
});

// mount routes for
router.use("/tasks", userRouter);

export default router;
