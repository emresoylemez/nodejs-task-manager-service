import fs = require("fs");
import jwt = require("jsonwebtoken");
import sha1 = require("sha1");

import { ISigninInput, ISignupInput, ISignoutInput, IValidateTokenInput, IToken } from "./entities";
import UserRepository from "../../repositories/user/UserRepository";
import { BadRequestError, UnprocessableError } from "../../entities/errors";
import { UnauthorizedResponse, SuccessResponse } from "../../entities/responses";
import { IPayload } from "./entities/IToken";

class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async signin({ body }: ISigninInput) {
    console.debug('UserController - signin:', JSON.stringify(body));

    const user = await this.userRepository.get(body);

    if (!user) {
      throw new BadRequestError([
        {
          location: "body",
          msg: "Wrong username or password",
          param: "body",
          value: ""
        }
      ]);
    }

    const token = await this.generateToken(user.username, user.tenantId);

    user.accessToken = token;

    this.userRepository.update(user);

    return {
      token
    };
  }


  public async signout({ headers }: ISignoutInput) {
    console.debug('UserController - signout:', JSON.stringify(headers));

    const token = headers.authorization.replace("Bearer ", "");
    this.verifyToken(token);

    const payload = await this.decodeToken(token);
    const user = await this.userRepository.getByUserName(payload.uid);

    if (!user) {
      throw new UnauthorizedResponse();
    }

    if (user.accessToken !== token) {
      throw new BadRequestError([
        {
          location: "body",
          msg: "Wrong jwt token",
          param: "body",
          value: ""
        }
      ]);
    }

    user.accessToken = null;

    this.userRepository.update(user);

    return {};
  }

  public async validateToken({ headers }: IValidateTokenInput) {
    console.debug('UserController - validateToken:', JSON.stringify(headers));
    const token = headers.authorization.replace("Bearer ", "");
    this.verifyToken(token);

    const payload = await this.decodeToken(token);
    const user = await this.userRepository.getByUserName(payload.uid);

    if (!user || user.accessToken !== token || payload.ext < Date.now()) {
      throw new BadRequestError([
        {
          location: "body",
          msg: "Wrong jwt token",
          param: "body",
          value: ""
        }
      ]);
    }

    return {
      active: true
    };
  }

  public async signup({ body }: ISignupInput) {
    console.debug('UserController - signup', JSON.stringify(body));

    const existingUser = await this.userRepository.getByUserName(body.username);

    if (existingUser) {
      return new UnauthorizedResponse("user already exists!");
    }

    const token = await this.generateToken(body.username, body.tenantId);
    const passwordHash = sha1(body.password);
    console.info(passwordHash);

    const newUser = await this.userRepository.create({
      username: body.username,
      password: passwordHash,
      tenantId: body.tenantId,
      firstName: body.firstName,
      lastName: body.lastName,
      accessToken: token
    });

    return {
      token
    };
  }

  private async generateToken(uid: string, tenantId: string) {
    const privateKey = fs.readFileSync("./private.pem", "utf8");
    const oneHour = 1000 * 60 * 60;
    return await jwt.sign({ uid, ext: Date.now() + oneHour, tenantId }, privateKey, { algorithm: "HS256" });
  }

  private async decodeToken(token: string): Promise<IPayload> {
    const decodedToken: IToken = await jwt.decode(token, { complete: true });

    console.log(decodedToken);

    return decodedToken.payload;
  }

  private async verifyToken(token: string): Promise<boolean> {
    try {
      const privateKey = fs.readFileSync("./private.pem", "utf8");
      await jwt.verify(token, privateKey);
    } catch (err) {
      console.error("Invalid token!!!", err);
      throw new UnauthorizedResponse();
    }

    return true;
  }
}

export default new UserController();
