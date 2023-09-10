import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

// Initialize the router functionality
export const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);
taskRouter.post('/tasks', createValidator, taskController.create);
taskRouter.patch('/tasks', createValidator, taskController.update);
taskRouter.patch('/tasks-status', updateValidator, taskController.updateStatus);
taskRouter.delete('/tasks', taskController.delete);
