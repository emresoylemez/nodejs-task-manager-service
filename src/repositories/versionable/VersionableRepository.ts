import { Model, Query } from "mongoose";

import { IBaseCreateInput, IBaseUpdateInput } from "../models";
import { IVersionableCreateInput, IVersionableUpdateInput } from "./models";
import { Nullable } from "../../libs/customTypes";
import BaseRepository from "../BaseRepository";
import IVersionableDocument from "./IVersionableDocument";
import { generateObjectId } from "../../libs/utilities";
import { lean } from "../../libs/utilities";

export default class VersionableRepository<D extends IVersionableDocument> extends BaseRepository<D> {
  constructor(model) {
    super(model);
  }

  /**
   * Create new application
   * @property {string} body.name - The name of record.
   * @returns {Application}
   */
  public async create(input: IVersionableCreateInput): Promise<D> {
    console.debug("VersionableRepository - create:", JSON.stringify(input));

    const id = input.id || generateObjectId();

    const model = new this.model({
      ...input,
      _id: id,
      originalId: id
    });

    return await model.save();
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(docs: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    console.debug("VersionableRepository - insertMany:");

    const docsToInsert: any = docs.map(item => {
      const id = item.id || generateObjectId();
      return { ...item, _id: id, originalId: id };
    });

    return super.insertMany(docsToInsert, options);
  }

  /**
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  public async updateVersionable(input: IVersionableUpdateInput): Promise<D> {
    console.debug("VersionableRepository - update:", JSON.stringify(input));

    console.debug("Searching for previous valid object...");
    const previous = await this.getById(input.originalId);

    console.debug("Invalidating previous valid object...");
    await this.invalidate(input.originalId);

    const newInstance = Object.assign({}, previous, input);
    newInstance["_id" as string] = generateObjectId();
    delete previous.deletedAt;
    const model = new this.model(newInstance);

    console.debug("Creating new object...");

    return await model.save();
  }

  /**
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  public async update(input: IVersionableUpdateInput): Promise<D> {
    console.debug("VersionableRepository - update:", JSON.stringify(input));

    console.debug("Searching for previous valid object...");
    const previous = await this.getById(input.originalId);

    console.debug("Invalidating previous valid object...");
    await this.invalidate(input.originalId);

    const newInstance = Object.assign({}, previous, input);
    newInstance["_id" as string] = generateObjectId();
    delete previous.deletedAt;
    const model = new this.model(newInstance);

    console.debug("Creating new object...");

    return await model.save();
  }

  public async delete(originalId: string): Promise<D> {
    console.debug("VersionableRepository - delete:", originalId);

    console.debug("Searching for previous valid object...");
    const previous = await this.getById(originalId);

    console.debug("Invalidating previous valid object...");
    await this.invalidate(originalId);

    const newId = generateObjectId();
    const newInstance = Object.assign({}, previous, { _id: newId, isSoftDeleted: true });
    const model = new this.model(newInstance);

    return model.save();
  }

  protected getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    console.debug("VersionableRepository - getAll:", JSON.stringify(conditions));

    const updatedQuery = {
      deletedAt: null,
      ...conditions
    };

    return super.getAll(updatedQuery, projection, options, populate);
  }

  protected getOne(conditions: any, populate?: any | null): Promise<Nullable<D>> {
    console.debug("VersionableRepository - getOne:", JSON.stringify(conditions));

    const updatedQuery = {
      deletedAt: null,
      ...conditions
    };

    return super.getOne(updatedQuery, populate);
  }

  protected getById(originalId: string, populate?: any | null): Promise<Nullable<D>> {
    console.debug("VersionableRepository - getById:", originalId, populate);

    return super.getOne({ originalId, deletedAt: null }, populate);
  }

  protected getByIds(originalIds: string[]): Promise<D[]> {
    console.debug("VersionableRepository - getByIds:", originalIds);

    return this.getAll({ originalId: { $in: originalIds } });
  }

  public count(conditions: any = {}): Query<number> {
    console.debug("VersionableRepository - count:", JSON.stringify(conditions));

    const updatedQuery = {
      deletedAt: null,
      ...conditions
    };

    return super.count(updatedQuery);
  }

  protected invalidate(originalId: string): Promise<D> {
    const now = new Date();
    return lean(this.model.update({ originalId, deletedAt: null }, { deletedAt: now }));
  }
}
