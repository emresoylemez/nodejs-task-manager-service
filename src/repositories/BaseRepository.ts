import { Document, Model, Query } from "mongoose";

import { Nullable } from "../libs/customTypes";
import { IBaseCreateInput, IBaseDeleteInput, IBaseListInput } from "./entities";
import { lean, leanObject } from "../libs/utilities";

export default abstract class BaseRepository<D extends Document> {
  /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  protected modelType: Model<D>;
  constructor(modelType) {
    this.modelType = modelType;
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    console.debug("BaseRepository - insertMany:");
    return this.modelType.insertMany(input, options);
  }

  public count(conditions: any = {}): Query<number> {
    console.debug("BaseRepository - count");
    return this.modelType.count(conditions);
  }

  protected async getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    console.debug("BaseRepository - getAll:");
    return populate
      ? (await this.modelType
        .find(conditions, projection, options)
        .populate(populate)
        .lean()).map(leanObject)
      : (await this.modelType.find(conditions, projection, options).lean()).map(leanObject);
  }

  protected getOne(conditions: any, populate?: any | null): Promise<Nullable<D>> {
    return populate ? lean(this.modelType.findOne(conditions).populate(populate)) : lean(this.modelType.findOne(conditions));
  }
}
