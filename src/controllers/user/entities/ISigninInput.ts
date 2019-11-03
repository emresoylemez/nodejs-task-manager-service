export default interface ISigninInput {
  body: {
    username: string;
    password: string;
    tenantId: string;
  };
}
