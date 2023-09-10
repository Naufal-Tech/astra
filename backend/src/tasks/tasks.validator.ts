import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The Task title is required')
    .trim()
    .isString()
    .withMessage('The task title should be a string'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('The task date should be a string'),
  body('description')
    .trim()
    .isString()
    .withMessage('The description should be a string'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('The priority should be Normal, High and Low'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('The status should be Todo, In-Progress and Completed'),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task ID is mandatory')
    .trim()
    .isString()
    .withMessage('ID Should be valid uuid format'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('The status should be Todo, In-Progress and Completed'),
];
