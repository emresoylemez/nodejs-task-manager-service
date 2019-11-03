import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as methodOverride from "method-override";
import * as morganBody from "morgan-body";
import Swagger from "./libs/Swagger";
import IConfig from "./config/IConfig";
import router from "./router";
import { EnvVars } from "./libs/constants";
import { notFoundHandler, errorHandler } from "./middlewares";

export default class Server {
  private app: express.Express;
  private configurations: IConfig;

  constructor(private config: any) {
    this.app = express();
    this.configurations = config;
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  public init() {
    this.initHelmet();
    this.initCompress();
    this.initCookieParser();
    this.initCors();
    this.initJsonParser();
    this.initMethodOverride();
    this.initLogger();
    this.initSwagger();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  public async reInit() {
    console.info(":::RE-INITIALISING AUTH-MIDDLEWARE AND SWAGGER:::");

    // this.initAuth();
    this.initSwagger();
  }
  /**
   * Initiate Socket IO for sending reference data
   * @param server
   */
  public initSockets(server) {
    console.info("Starting Sockets...");
  }

  /**
   * Compression of the output
   */
  private initCompress() {
    this.app.use(compress());
  }

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  private initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  private initCors() {
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        origin: this.configurations.corsOrigin
      })
    );
  }

  /**
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  private initHelmet() {
    this.app.use(helmet());
  }

  /**
   * Parses urlencoded bodies & JSON
   */
  private initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   * Enabling Logger for Development Environment
   */
  private initLogger() {
    const { nodeEnv } = this.configurations;

    if (nodeEnv !== EnvVars.TEST) {
      morganBody(this.app, {
        skip: (req, res) => {
          return req.originalUrl === "/api/health-check";
        }
      });
    }
  }

  /**
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn"t support it.
   */
  private initMethodOverride() {
    this.app.use(methodOverride());
  }
  /**
   * Initialize Swagger
   */
  private initSwagger() {
    const { swagger } = this.configurations;
    // const { definition, url } = swagger;
    const swaggerSetup = new Swagger();

    //   // JSON route
    this.app.use(`${swagger.url}.json`, swaggerSetup.getRouter(swagger));

    //   // UI route
    const { serve, setup } = swaggerSetup.getUI(swagger.url);

    this.app.use(swagger.url, serve, setup);
  }

  /**
   * This will Setup all the routes in the system
   * @returns -Instance of Current Object
   * @memberof Server
   */
  private setupRoutes() {
    const { apiPrefix } = this.configurations;

    // mount all routes on /api path
    this.app.use(apiPrefix, router);

    // catch 404 and forward to error handler
    this.app.use(notFoundHandler);
  }

  private setupErrorHandler() {
    const { nodeEnv } = this.configurations;

    // error handler, send stacktrace only during development
    this.app.use(errorHandler(nodeEnv));
  }
}
