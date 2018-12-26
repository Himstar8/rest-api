import express from 'express';
import { userRouter } from './ressources/user/user.router';

export const restRouter = express.Router();

restRouter.use('/users', userRouter);
