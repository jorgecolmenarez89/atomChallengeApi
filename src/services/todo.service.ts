import { title } from "process";
import { ITask } from "../models/Task.model";
import { db } from "../utils/firebase-admin";
import moment from "moment";

export const getTasksService = async (userId: string): Promise<ITask[]> => {
  let returnTask: ITask[] = [];
  const tasks = await db.collection("tasks")
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .get();
  tasks.docs.forEach((doc) => {
    returnTask.push({
      id: doc.id ?? '',
      title: doc.data().title,
      description: doc.data().description,
      done: doc.data().done,
      createdAt: doc.data().createdAt,
      userId: doc.data().userId
    })
  });
  return returnTask;
}

export const createTaskService = async (task: ITask): Promise<ITask>  => {
  let returnTask: ITask | null = null
  const newTask = await db.collection("tasks").add({
    ...task,
    done: false,
    createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  });
  returnTask = {
    ...task,
    id: newTask.id,
    done: false,
    createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  }
  return returnTask;
}

export const updateTaskService = async (task: ITask): Promise<ITask> => {
  if (task.id) {
    await db.collection("tasks").doc(task.id).set(task);
  }
  return task;
}

export const deleteTaskService = async (taskId: string): Promise<any> => {
  await db.collection("tasks").doc(taskId).delete();
}