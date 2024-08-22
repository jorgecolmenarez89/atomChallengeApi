export interface ITask {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  userId: string;
  createdAt?: string;
}