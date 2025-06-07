import { Pool, QueryResult } from 'pg';
import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import pool from '../../db';

export class PostgresTaskRepository implements TaskRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async findAll(): Promise<Task[]> {
    const result = await this.pool.query('SELECT * FROM tasks');
    return result.rows;
  }

  async findById(id: number): Promise<Task | null> {
    const result = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const { title, status, created_at } = task;
    const result = await this.pool.query(
      'INSERT INTO tasks (title, status, created_at) VALUES ($1, $2, $3) RETURNING *',
      [title, status, created_at]
    );
    return result.rows[0];
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    const { title, status, updated_at } = task;
    const result = await this.pool.query(
      'UPDATE tasks SET title = $1, status = $2, updated_at = $3 WHERE id = $4 RETURNING *',
      [title, status, updated_at, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
} 