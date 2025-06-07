import express from "express";
import { TaskController } from "../interfaces/controllers/TaskController";
import { TaskUseCases } from "../application/useCases/TaskUseCases";
import { PostgresTaskRepository } from "../infrastructure/database/PostgresTaskRepository";

const router = express.Router();
const taskRepository = new PostgresTaskRepository();
const taskUseCases = new TaskUseCases(taskRepository);
const taskController = new TaskController(taskUseCases);

// タスクを全権取得する
router.get("/", (req, res) => taskController.getAllTasks(req, res));

// タスクをIDで取得する
router.get("/:id", (req, res) => taskController.getTaskById(req, res));

// タスクを新規登録する
router.post("/", (req, res) => taskController.createTask(req, res));

// タスクを削除する
router.delete("/:id", (req, res) => taskController.deleteTask(req, res));

// タスクを更新する
router.put("/:id", (req, res) => taskController.updateTask(req, res));

export default router; 