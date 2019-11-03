export default interface IToken {
  payload: IPayload;
}

export interface IPayload {
  uid: string;
  ext: number;
  iat: number;
}