import { Router } from "express";
import * as todoController from "../controllers/todoController";

const router = Router();

router.get("/todo", todoController.getTodo);
router.post("/todo", todoController.addTodo);
router.put("/todo/:todoId", todoController.updateTodo);
router.delete("/todo/:todoId", todoController.deleteTodo);

export default router;
