export default interface ICoreConfig {
  apiPrefix: string;
  configSecret: string;
  corsOrigin: string;
  dbConnectionString: string;
  nodeEnv: string;
  port: string;
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
