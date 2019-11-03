import { forEachSync } from "../libs/utilities";
import users from "./users";
import UserRepository from "../repositories/user/UserRepository";

class Seed {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async start() {
    try {
      const [userCount] = await Promise.all([this.userRepository.count()]);

      //#region [Users]
      if (userCount === 0) {
        console.info("Seeding users into the database");

        await this.userRepository.insertMany(users);
        console.info("UserRepository seeding completed successfully");
      }
      //#endregion
    } catch (err) {
      console.error("error in seeding", err);
    }
  }
}
export default new Seed();
