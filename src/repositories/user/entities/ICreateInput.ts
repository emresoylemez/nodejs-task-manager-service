import { IBaseCreateInput } from "../../entities";

export default interface ICreateInput extends IBaseCreateInput {
  username: string;
  password: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
}
