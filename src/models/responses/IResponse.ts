
export type IData = any | any[] | null;

export interface IMetadata {
  code: number;
  message: string;
  timestamp: Date;
}
export default interface IResponse {
  data: IData;
  metadata: IMetadata;
}
