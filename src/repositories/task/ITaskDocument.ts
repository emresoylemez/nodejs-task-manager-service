import { Document } from "mongoose";
import IEntity from "../../entities/IEntity";

export default interface ITaskDocument extends Document, IEntity {
  id: string;
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
  userId: string;
  title: string;
}
