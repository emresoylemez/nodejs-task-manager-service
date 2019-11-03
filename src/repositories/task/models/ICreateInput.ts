import { IBaseCreateInput } from "../../models";

export default interface ICreateInput extends IBaseCreateInput {
  userId: string;
  title: string;
}
