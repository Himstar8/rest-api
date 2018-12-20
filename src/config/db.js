import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

export const connect = () => {
  mongoose
    .connect(
      config.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log('connection established...'))
    .catch(err => console.log(err));
};
