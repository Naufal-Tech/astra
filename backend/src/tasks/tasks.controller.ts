import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { FindOneOptions } from 'typeorm';
import { dbConnection } from '../../index';
import { Task } from './tasks.entity';

export class TaskController {
  //   private taskRepository = getRepository(Task);

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    // Declare a variable to hold all the tasks:
    let allTasks: Task[];

    try {
      allTasks = await dbConnection.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const { title, date, description, priority, status } = req.body;

        const task = new Task();
        task.title = title;
        task.date = date;
        task.description = description;
        task.priority = priority;
        task.status = status;

        // add the new task to database
        let createdTask: Task;

        createdTask = await dbConnection.getRepository(Task).save(task);

        // convert the task instance into an object
        createdTask = instanceToPlain(createdTask) as Task;

        return res.status(201).json(createdTask);
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, date, description, priority, status } = req.body;

    // Try to find if the tasks exists
    let task: Task | null;

    try {
      const options: FindOneOptions<Task> = {
        where: { id }, // Provide the id as the selection condition
      };
      task = await dbConnection.getRepository(Task).findOne(options);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      task.title = title;
      task.date = date;
      task.description = description;
      task.priority = priority;
      task.status = status;

      const updatedTask = await dbConnection.getRepository(Task).save(task);

      return res.json(updatedTask);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public updateStatus = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, status } = req.body;

    let task: Task | null;

    try {
      const options: FindOneOptions<Task> = {
        where: { id },
      };
      task = await dbConnection.getRepository(Task).findOne(options);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      task.status = status;

      const updatedTask = await dbConnection.getRepository(Task).save(task);

      return res.json(updatedTask);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      const options: FindOneOptions<Task> = {
        where: { id }, // Provide the id as the selection condition
      };
      const task = await dbConnection.getRepository(Task).findOne(options);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      await dbConnection.getRepository(Task).remove(task);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export const taskController = new TaskController();
