const { default: coreConfig } = require("./config/config.core"); // tslint:disable-line

import seed from "./seed";
import Database from "./services/Database";

// DB Connection
Database.open({ dbConnectionString: coreConfig.dbConnectionString })
  .then(() => seed.start())
  .then(() => {
    const { default: Server } = require("./Server"); // tslint:disable-line

    const server = new Server(coreConfig);
    server.init();

    const runningServer = server.application.listen(coreConfig.port);

    runningServer.on("listening", async () => {
      const ann = `|| App is running at port "${coreConfig.port}" in "${coreConfig.nodeEnv}" mode ||`;

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
      console.log(`:::::: CLOSING SERVER RUNNING ON "${coreConfig.port}" IN "${coreConfig.nodeEnv}" MODE ::::::`);
    });
  })
  .catch(err => {
    console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
    console.error(err);
  });
