import { Application } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/todo.controller";
import { createUser, getUser } from "../controllers/user.controller";

export function routes(app: Application) {
  app.post("/tasks", createTask)
  app.get("/tasks", getTasks)
  app.put("/tasks/:taskId", updateTask)
  app.delete("/tasks/:taskId", deleteTask)
  app.post("/users", createUser)
  app.get("/users/:email", getUser)
}