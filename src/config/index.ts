import dotenv = require("dotenv");
import IConfig from "./IConfig";
import { EnvVars } from "../libs/constants";

if (process.env.NODE_ENV === EnvVars.TEST) {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const config: IConfig = {
  apiPrefix: process.env.API_PREFIX,
  corsOrigin: process.env.CORS_ORIGIN,
  dbConnectionString: process.env.DB_CONNECTION_STRING.replace("__default__", process.env.SERVICE_NAME),
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  swagger: {
    definition: {
      basePath: "/api",
      info: {
        description: "API with Swagger",
        title: "API",
        version: ""
      }
    },
    url: "/api-docs"
  }
};

console.log(":::::: INITIAL CONFIGURATIONS ::::::");
console.log(JSON.stringify(config, null, 2));

export default config;
