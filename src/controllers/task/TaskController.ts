import fs = require("fs");
import jwt = require("jsonwebtoken");

import { ICreateInput, ICreateOutput, IGetInput, IGetOutput, IListInput, IListOutput } from "./models";
import TaskRepository from "../../repositories/task/TaskRepository";
import { BadRequestError, UnprocessableError } from "../../entities/errors";
import { UnauthorizedResponse, SuccessResponse } from "../../entities/responses";

class TaskController {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public async get({ params, locals }: IGetInput): Promise<IGetOutput> {
    console.debug("TaskController - get:", JSON.stringify(params), JSON.stringify(locals));

    const task = await this.taskRepository.getOne(params.id, locals.userId);

    if (!task) {
      throw new BadRequestError([
        {
          location: "params",
          msg: "Wrong task id or it does not belong to you.",
          param: "params",
          value: params.id
        }
      ]);
    }

    return {
      id: task.id,
      title: task.title
    } as IGetOutput;
  }

  public async list({ locals }: IListInput): Promise<IListOutput[]> {
    console.debug("TaskController - list:", JSON.stringify(locals));

    const tasks = await this.taskRepository.list({ userId: locals.userId });

    return tasks.map(task => ({
      id: task.originalId,
      title: task.title
    }));
  }

  public async create({ body, locals }: ICreateInput) {
    console.debug("TaskController - create:", JSON.stringify(body), JSON.stringify(locals));

    const newTask = await this.taskRepository.create({
      userId: locals.userId,
      title: body.title
    });

    return {
      id: newTask.id
    };
  }
}

export default new TaskController();
