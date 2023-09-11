import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Connection, createConnection } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request body
app.use(bodyParser.json());

// use CORS middleware
app.use(cors());

// Defining the routes
app.use('/', taskRouter);

// Create Database connection
export let dbConnection: Connection;

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  synchronize: true,
})
  .then((connection) => {
    dbConnection = connection;

    // Define server port
    const port = process.env.PORT || 4000;

    // Start listening on the defined port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

export default app;
