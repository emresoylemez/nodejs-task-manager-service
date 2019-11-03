import * as mongoose from "mongoose";

import ITaskModel from "./ITaskDocument";
import TaskSchema from "./TaskSchema";

/**
 * Client Schema
 */
const taskSchema = new TaskSchema(
  {
    id: String
  },
  {
    collection: "Tasks",
    versionKey: false
  }
);

/**
 * indexes
 */
taskSchema.index({ userId: 1, deletedAt: 1 });

/**
 * @typedef User
 */
export const userModel: mongoose.Model<ITaskModel> = mongoose.model<ITaskModel>("Task", taskSchema);
