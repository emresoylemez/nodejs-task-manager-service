import { Model } from "mongoose";
import sha1 = require("sha1");

import { userModel } from "./userModel";
import IUserModel from "./IUserModel";
import { ICreateInput, IGetInput } from "./entities";
import VersionableRepository from "../versionable/VersionableRepository";

export default class UserRepository extends VersionableRepository<IUserModel> {
  constructor() {
    super(userModel);
  }

  /**
   * finds existing user with userName and pass
   */
  public async get(input: IGetInput): Promise<IUserModel> {
    console.debug("UserRepository - get:", JSON.stringify(input));
    console.debug("emre - get:", JSON.stringify(input));
    const passwordHash = sha1(input.password);
    console.info(passwordHash);
    return super.getOne({ username: input.username, password: passwordHash });
  }


  /**
   * finds existing user with userName and pass
   */
  public async getByUserName(username: string): Promise<IUserModel> {
    console.debug("UserRepository - get:", JSON.stringify(username));

    return super.getOne({ username });
  }


  /**
   * Create new user
   */
  public create(input: ICreateInput): Promise<IUserModel> {
    console.debug("UserRepository - create:", JSON.stringify(input));

    return super.create(input);
  }
}
