import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router();

userRouter.post('/register', userController.signup);
userRouter.post('/login', userController.login);

// for test purpose
userRouter.get('/', (req, res, next) => {
  res.status(200).json({ message: "i'm working" });
});
