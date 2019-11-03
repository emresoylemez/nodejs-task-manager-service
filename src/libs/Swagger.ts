import { Router } from "express";
import swaggerJSDoc = require("swagger-jsdoc");
import * as swaggerUi from "swagger-ui-express";

export interface ISwagger {
  definition: {
    basePath: string;
    info: {
      description: string;
      title: string;
      version: string;
    };
  };
  url: string;
}

export default class Swagger {
  public getRouter(swagger: ISwagger) {
    const router = Router();

    router.route("/").get((req, res) => {
      // options for the swagger docs
      const options = {
        // path to the API docs
        apis: ["dist/src/**/*.js"],
        // import swagger definitions
        swaggerDefinition: swagger.definition
      };
      // initialize swagger-jsdoc
      const swaggerSpec = swaggerJSDoc(options);
      res.send(swaggerSpec);
    });
    return router;
  }

  public getUI(swaggerUrl: string) {
    const options = {
      swaggerUrl: `${swaggerUrl}.json`
    };

    return {
      serve: swaggerUi.serve,
      setup: swaggerUi.setup(undefined, options)
    };
  }
}
