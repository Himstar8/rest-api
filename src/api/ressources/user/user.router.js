import express from 'express';
import userController from './user.controller';
import passport from 'passport';

export const userRouter = express.Router();

userRouter.post('/register', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/email', userController.checkEmail);
userRouter.get(
  '/shops',
  passport.authenticate('jwt', { session: false }),
  userController.getlikedShops
);
