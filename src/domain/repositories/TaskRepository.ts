import { Task } from '../entities/Task';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(id: number, task: Partial<Task>): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
} 