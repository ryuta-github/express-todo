import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class TaskUseCases {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async createTask(taskData: { title: string; status: string }): Promise<Task> {
    const task: Omit<Task, 'id'> = {
      ...taskData,
      created_at: new Date(),
    };
    return this.taskRepository.create(task);
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const task: Partial<Task> = {
      ...taskData,
      updated_at: new Date(),
    };
    return this.taskRepository.update(id, task);
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
} 