import { expect } from 'chai';
import request from 'supertest';
import app from '../index'; // Import your Express app instance

describe('TaskController', function () {
  it('should return all tasks', function (done) {
    request(app).get('/tasks').expect(200);
    done();
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
