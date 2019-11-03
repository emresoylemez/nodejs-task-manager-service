import IEntity from "../../../entities/IEntity";
import { Nullable } from "../../../libs/customTypes";

/**
 * Stores the basic fields for Catalog
 */
export default interface ICatalogOutput extends IEntity {
  id: string;
  tenantId: string;
  appCode: string;
  serviceCode: string;
  storageType: string;
  credential: string;
  dbName: Nullable<string>;
}
