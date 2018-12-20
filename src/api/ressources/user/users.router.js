import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router();

userRouter.post('/login', userController.login);

userRouter.post('/register', userController.signup);
