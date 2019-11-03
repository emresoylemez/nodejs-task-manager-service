import tasks from "./tasks";
import TaskRepository from "../repositories/task/TaskRepository";

class Seed {
  private taskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public async start() {
    try {
      const [userCount] = await Promise.all([this.taskRepository.count()]);

      //#region [Tasks]
      if (userCount === 0) {
        console.info("Seeding tasks into the database");

        // await this.taskRepository.insertMany(tasks);
        console.info("TaskRepository seeding completed successfully");
      }
      //#endregion
    } catch (err) {
      console.error("error in seeding", err);
    }
  }
}
export default new Seed();
