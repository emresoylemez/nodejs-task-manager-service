import { Model } from "mongoose";
import sha1 = require("sha1");

import { userModel } from "./taskModel";
import ITaskDocument from "./ITaskDocument";
import { ICreateInput, IListInput } from "./models";
import VersionableRepository from "../versionable/VersionableRepository";

export default class TaskRepository extends VersionableRepository<ITaskDocument> {
  constructor() {
    super(userModel);
  }

  /**
   * finds existing user with userName and pass
   */
  public async list(input: IListInput): Promise<ITaskDocument[]> {
    console.debug("TaskRepository - list:", JSON.stringify(input));

    return super.getAll({ userId: input.userId, deletedAt: null });
  }

  /**
   * finds existing user with userName and pass
   */
  public async getOne(originalId: string, userId: string): Promise<ITaskDocument> {
    console.debug("TaskRepository - getOne:", JSON.stringify(originalId), JSON.stringify(userId));

    return super.getOne({ originalId, userId, deletedAt: null });
  }

  /**
   * Create new user
   */
  public create(input: ICreateInput): Promise<ITaskDocument> {
    console.debug("TaskRepository - create:", JSON.stringify(input));

    return super.create(input);
  }
}
