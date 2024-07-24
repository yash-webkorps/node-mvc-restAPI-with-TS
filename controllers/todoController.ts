import { Request, Response } from "express";
import { Todo } from "../models/todos";
import { RequestBody } from "../interfaces/interfaces";
import { RequestParams } from "../types/types";

let todos: Todo[] = [];

export const getTodo = (req: Request, res: Response) => {
    try {
      res.status(201).json({ todos: todos });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log('Unexpected error', error);
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
}

export const addTodo = (req: Request, res: Response) => {
    try {
      const body = req.body as RequestBody;
      const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
      };
      todos.push(newTodo);
  
      return res.status(201).json({ message: "added" });
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log('Unexpected error', error);
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
}

export const updateTodo = (req: Request, res: Response) => {
    try {
      const params = req.params as RequestParams;
      const body = req.body as RequestBody;
      const tid = params.todoId;
      const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  
      if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(201).json({ message: "updated" });
      }
  
      res.status(404).json({ error: "Something went wrong!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log('Unexpected error', error);
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
}

export const deleteTodo = (req: Request, res: Response) => {
    try {
      const params = req.params as RequestParams;
      const tid = params.todoId;
  
      todos = todos.filter((todoItem) => todoItem.id != tid);
      res.status(201).json({ message: "deleted" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log('Unexpected error', error);
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  }