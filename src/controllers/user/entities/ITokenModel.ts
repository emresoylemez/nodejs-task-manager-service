export default interface ISigninInput {
  body: {
    username: string;
    ext: number;
    iat: number;
  };
}

