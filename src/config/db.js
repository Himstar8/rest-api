import mongoose from 'mongoose';
import { config } from '../config/config';

mongoose.Promise = global.Promise;

export const connect = () => {
  mongoose
    .connect(
      config.developement.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log('Mongodb connnection: Connection established...'))
    .catch(() => console.log('Mongodb connnection: Connection failed'));
};
