// const { default: coreConfig } = require("./config/config.core"); // tslint:disable-line

import seed from "./seed";
import config from "./config";
import Database from "./services/Database";

// DB Connection
Database.open({ dbConnectionString: config.dbConnectionString })
  .then(() => seed.start())
  .then(() => {
    const { default: Server } = require("./Server"); // tslint:disable-line

    const server = new Server(config);
    server.init();

    const runningServer = server.application.listen(config.port);

    runningServer.on("listening", async () => {
      const ann = `|| App is running at port "${config.port}" in "${config.nodeEnv}" mode ||`;

      console.log(ann.replace(/[^]/g, "-"));
      console.log(ann);
      console.log(ann.replace(/[^]/g, "-"));
      console.log("Press CTRL-C to stop\n");
    });

    runningServer.on("error", err => {
      console.log(":::::: GOT ERROR IN STARTING SERVER ::::::");
      console.error(err);
    });

    runningServer.on("close", () => {
      console.log(`:::::: CLOSING SERVER RUNNING ON "${config.port}" IN "${config.nodeEnv}" MODE ::::::`);
    });
  })
  .catch(err => {
    console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
    console.error(err);
  });
