export default interface IGetInput {
  query: {
    tenantId: string;
    appCode: string;
    serviceCode: string;
    storageType: string;
  };
}
