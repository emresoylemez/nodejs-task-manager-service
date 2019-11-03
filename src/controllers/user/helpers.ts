import { ICatalogOutput } from "./entities";

export function convertToCatalogOutput(catalog: any): ICatalogOutput {
  return {
    id: catalog.id,
    tenantId: catalog.tenantId,
    appCode: catalog.appCode,
    serviceCode: catalog.serviceCode,
    storageType: catalog.storageType,
    credential: catalog.credential,
    dbName: catalog.dbName
  };
}
