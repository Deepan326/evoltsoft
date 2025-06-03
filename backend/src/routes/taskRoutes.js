import express from "express";
import {newTask, updateTask,getTask, deleteTask } from "../controllers/taskController.js" 
const taskRouter=express.Router();

taskRouter.get("/tasks",getTask);
taskRouter.post("/task",newTask);
taskRouter.put("/task/:id",updateTask);
taskRouter.delete("/task/:id",deleteTask);

export default taskRouter;