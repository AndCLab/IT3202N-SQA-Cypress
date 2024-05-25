import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "./controllers/auth.controller.js";
import { authenticateToken } from "./middlewares/authenticateToken.js";
import validateResource from "./middlewares/validateResource.js";
import { authSchema } from "./schemas/auth.schema.js";
import {
  createTaskSchema,
  taskIdParams,
  updateTaskSchema,
} from "./schemas/task.schema.js";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getAllTasksHandler,
  updateTaskStatusHandler,
} from "./controllers/task.controller.js";

const router = Router();

// app check
router.get("/", (req, res) => res.sendStatus(200));

// Auth Routes
router.post("/register", validateResource(authSchema), register);
router.post("/login", validateResource(authSchema), login);
router.get("/refresh", refreshToken);
router.delete("/logout", authenticateToken, logout);
router.get("/verify", authenticateToken, (req, res) => res.json(req.user));

// Task Routes
router.get("/task", authenticateToken, getAllTasksHandler);
router.post(
  "/task",
  [authenticateToken, validateResource(createTaskSchema)],
  createTaskHandler
);
router.put(
  "/task/:taskId",
  [authenticateToken, validateResource(updateTaskSchema)],
  editTaskHandler
);
router.delete(
  "/task/:taskId",
  [authenticateToken, validateResource(taskIdParams)],
  deleteTaskHandler
);
router.patch(
  "/task/:taskId",
  [authenticateToken, validateResource(taskIdParams)],
  updateTaskStatusHandler
);

export default router;
