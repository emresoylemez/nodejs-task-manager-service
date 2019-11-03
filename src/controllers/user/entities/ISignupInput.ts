export default interface ISignupInput {
  body: {
    username: string;
    password: string;
    tenantId: string;
    firstName: string;
    lastName: string;
  };
}
