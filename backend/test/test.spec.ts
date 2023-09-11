import { expect } from 'chai';
import { after, before } from 'mocha';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import app from '../index';
import { Task } from '../src/tasks/tasks.entity';

let db: Connection;

before(async () => {
  try {
    db = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Task],
      synchronize: true,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});

after(() => {
  if (db) {
    db.close().then(() => {
      console.log('Database connection closed.');
    });
  }
});

describe('TaskController', function () {
  it('should return all tasks', function (done) {
    request(app).get('/tasks').expect(200);
    done();
  });
});

describe('TaskController', function () {
  it('Created', function (done) {
    const newTask = {
      title: 'New Task 123 NEW',
      date: '2023-12-12',
      description: 'New Task Description',
      priority: 'Normal',
      status: 'Todo',
    };

    request(app)
      .post('/tasks')
      .send(newTask)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);

        // Check the response body
        expect(res.body).to.have.property('id');
        expect(res.body.title).to.equal(newTask.title);
        expect(res.body.date).to.equal(newTask.date);
        expect(res.body.description).to.equal(newTask.description);
        expect(res.body.priority).to.equal(newTask.priority);
        expect(res.body.status).to.equal(newTask.status);
        done();
      });
  });

  it('should update a task', function (done) {
    const updatedTask = {
      id: 'd3a0ba3c-016d-414a-833c-2b82c103ebdd',
      title: 'Updated NEW TASK',
      date: '2023-12-13',
      description: 'Updated Task Description',
      priority: 'High',
      status: 'In-Progress',
    };

    request(app)
      .patch('/tasks')
      .send(updatedTask)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        expect(res.body).to.have.property('id');
        expect(res.body.title).to.equal(updatedTask.title);
        expect(res.body.date).to.equal(updatedTask.date);
        expect(res.body.description).to.equal(updatedTask.description);
        expect(res.body.priority).to.equal(updatedTask.priority);
        expect(res.body.status).to.equal(updatedTask.status);
        done();
      });
  });

  it('should update task status', function (done) {
    const updatedStatus = {
      id: 'd3a0ba3c-016d-414a-833c-2b82c103ebdd',
      status: 'Completed',
    };

    request(app)
      .patch('/tasks-status')
      .send(updatedStatus)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        expect(res.body).to.have.property('id');
        expect(res.body.status).to.equal(updatedStatus.status);
        done();
      });
  });

  it('should delete a task', function (done) {
    const taskToDelete = {
      id: 'efe5d46e-2819-4f33-b370-730316be8c36',
    };

    request(app)
      .delete('/tasks')
      .send(taskToDelete)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Task deleted successfully');
        done();
      });
  });
});

class HelloWorld {
  show() {
    return 'Hello World';
  }
}

describe('Test Hello World', () => {
  it('Hello', () => {
    const answer = new HelloWorld();
    expect(answer.show()).to.be.equal('Hello World');
  });

  it('return', () => {
    const answer = new HelloWorld();
    expect(answer.show()).to.be.equal('Hello World');
  });
});
