import { Document, Model, Query } from "mongoose";

import { Nullable } from "../libs/customTypes";
import { IBaseCreateInput, IBaseDeleteInput, IBaseListInput } from "./models";
import { lean, leanObject } from "../libs/utilities";

export default abstract class BaseRepository<D extends Document> {
  /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  protected model: Model<D>;
  constructor(model) {
    this.model = model;
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    console.debug("BaseRepository - insertMany:", JSON.stringify(input));
    return this.model.insertMany(input, options);
  }

  public count(conditions: any = {}): Query<number> {
    console.debug("BaseRepository - count:", JSON.stringify(conditions));
    return this.model.count(conditions);
  }

  protected async getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    console.debug("BaseRepository - getAll:", JSON.stringify(conditions), JSON.stringify(projection), JSON.stringify(options));
    return populate
      ? (await this.model
          .find(conditions, projection, options)
          .populate(populate)
          .lean()).map(leanObject)
      : (await this.model.find(conditions, projection, options).lean()).map(leanObject);
  }

  protected getOne(conditions: any, populate?: any | null): Promise<Nullable<D>> {
    return populate ? lean(this.model.findOne(conditions).populate(populate)) : lean(this.model.findOne(conditions));
  }
}
