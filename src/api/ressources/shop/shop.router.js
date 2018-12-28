import express from 'express';
import passport from 'passport';
import shopController from './shop.controller';

export const shopRouter = express.Router();

shopRouter.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  shopController.add
);
shopRouter.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  shopController.remove
);
