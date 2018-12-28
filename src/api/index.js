import express from 'express';
import { userRouter } from './ressources/user/user.router';
import { shopRouter } from './ressources/shop';

export const restRouter = express.Router();

restRouter.use('/users', userRouter);
restRouter.use('/shops', shopRouter);
