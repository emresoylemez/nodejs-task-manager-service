import VersionableSchema from "../versionable/VersionableSchema";

export default class UserSchema extends VersionableSchema {
  constructor(options: any, collections: any) {
    const schema = {
      firstName: {
        required: true,
        type: String
      },
      lastName: {
        required: true,
        type: String
      },
      password: {
        required: true,
        type: String
      },
      username: {
        required: true,
        type: String
      },
      tenantId: {
        required: true,
        type: String
      },
      accessToken: {
        required: false,
        type: String
      }
    };

    super(schema, collections);
  }
}
