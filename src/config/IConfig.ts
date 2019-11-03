export default interface IConfig {
  apiPrefix: string;
  corsOrigin: string;
  dbConnectionString: string;
  nodeEnv: string;
  port: string;
  serviceName: string;
  swagger: {
    definition: {
      basePath: string;
      info: {
        description: string;
        title: string;
        version: string;
      };
    };
    url: string;
  };
}
