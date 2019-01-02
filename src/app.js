import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';

import { connect } from './config/db';
import { configJWTStrategy } from './api/middlewares/passport-jwt';
import { restRouter } from './api/index';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(logger('dev'));
}

connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(passport.initialize());
configJWTStrategy();

app.use('/api', restRouter);
app.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

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
