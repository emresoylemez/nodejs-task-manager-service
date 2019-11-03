import VersionableSchema from "../versionable/VersionableSchema";

export default class TaskSchema extends VersionableSchema {
  constructor(options: any, collections: any) {
    const schema = {
      title: {
        required: true,
        type: String
      },
      userId: {
        required: true,
        type: String
      }
    };

    super(schema, collections);
  }
}
