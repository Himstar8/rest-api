import express from 'express';
import { connect } from './config/db';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { restRouter } from './api';

const app = express();

connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/api', restRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 500;
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

app.listen(3000, () => console.log(`Server running on port ${3000}...`));
