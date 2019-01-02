import Passport from 'passport';
import PassportJWT from 'passport-jwt';

import User from '../ressources/user/user.model';
import { config } from '../../config/config';

export const configJWTStrategy = () => {
  const options = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
  };
  Passport.use(
    new PassportJWT.Strategy(options, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
