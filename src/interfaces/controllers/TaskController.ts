import { Request, Response } from 'express';
import { TaskUseCases } from '../../application/useCases/TaskUseCases';

export class TaskController {
  constructor(private taskUseCases: TaskUseCases) {}

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskUseCases.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const task = await this.taskUseCases.getTaskById(taskId);
      
      if (!task) {
        res.status(404).send('Task not found');
        return;
      }
      
      res.json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, status } = req.body;
      const task = await this.taskUseCases.createTask({ title, status });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const { title, status } = req.body;
      const task = await this.taskUseCases.updateTask(taskId, { title, status });
      
      if (!task) {
        res.status(404).send('Task not found');
        return;
      }
      
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.id, 10);
      const success = await this.taskUseCases.deleteTask(taskId);
      
      if (!success) {
        res.status(404).send('Task not found');
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Internal Server Error');
    }
  }
} 