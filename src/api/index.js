import express from 'express';
import { userRouter } from './ressources/user/index';

export const restRouter = express.Router();

restRouter.use('/users', userRouter);
