import { Request, Response } from "express";
import { getTasksService, createTaskService, updateTaskService, deleteTaskService } from "../services/todo.service";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).send("UserId is required");
    }
    const tasks  = await getTasksService(userId);
    res.status(200).send(tasks);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
  return res.status(200).send("Hello World!");
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    const newTask = await createTaskService(task);
    return res.status(201).send({
      message: "Task created successfully",
      data: newTask
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const task = {...req.body, id: taskId};
    const taskUpdated = await updateTaskService(task);
    return res.status(200).send({
      messgge: "Task updated successfully",
      data: taskUpdated
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await deleteTaskService(taskId);
    return res.status(200).send({
      message: "Task deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}