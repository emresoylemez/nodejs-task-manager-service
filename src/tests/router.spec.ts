import * as supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { API_PREFIX } from "../../src/libs/constants";
import Server from "../../src/Server";
import Database from "../../src/services/Database";
import { config } from "../config/config.test";

const server = new Server(config);
const mongoServer = new MongoMemoryServer();

describe("Health Check", () => {
  const request = supertest(server.application);

  beforeAll(done => {
    server.init();

    mongoServer.getConnectionString().then(async dbConnectionString => {
      await Database.open({ dbConnectionString });
      done();
    });
  });

  afterAll(() => {
    Database.close();
  });

  it("config-status should return 200", done => {
    request.get(`${API_PREFIX}/version`).expect(200, done);
  });

  it("should return 404 ", done => {
    request.get("/fake-url").expect(404, done);
  });

  it("should return 200", done => {
    request.get(`${API_PREFIX}/health-check`).expect(200, done);
  });
});
