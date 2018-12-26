import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';

import { connect } from './config/db';
import { configJWTStrategy } from './api/middlewares/passport-jwt';
import { restRouter } from './api/index';

const app = express();

connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
configJWTStrategy();

app.use(logger('dev'));

app.use('/api', restRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  error.message = 'Invalid Route';
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server runnning on port ${port}...`));
