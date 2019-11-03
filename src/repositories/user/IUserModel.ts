import { Document } from "mongoose";
import IEntity from "../../entities/IEntity";

export default interface IUserModel extends Document, IEntity {
  id: string;
  createdAt: Date;
  deletedAt: Date;
  firstName: string;
  lastName: string;
  originalId: string;
  password: string;
  username: string;
  tenantId: string;
  accessToken: string;
}
