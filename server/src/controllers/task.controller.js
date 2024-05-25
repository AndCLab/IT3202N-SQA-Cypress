import * as service from "../services/task.service.js";

export async function getAllTasksHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const tasks = await service.getAllUserTasks(userId);
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTaskHandler(req, res, next) {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    if (await service.getByTitle(title)) {
      return res.status(409).json({ message: "Title already exists" });
    }

    await service.createTask(userId, title, description, status);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function editTaskHandler(req, res, next) {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;

    if (!(await service.getById(taskId))) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (await service.getByTitle(title)) {
      return res.status(409).json({ message: "Title already exists" });
    }

    await service.editTask(taskId, title, description);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskHandler(req, res, next) {
  try {
    const { taskId } = req.params;

    if (!(await service.getById(taskId))) {
      return res.status(404).json({ message: "Task not found" });
    }

    await service.deleteTask(taskId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function updateTaskStatusHandler(req, res, next) {
  try {
    const { taskId } = req.params;

    if (!(await service.getById(taskId))) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = await service.getById(taskId);

    await service.updateTaskStatus(taskId, task.status);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
