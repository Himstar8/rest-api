import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const connect = () => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(() => console.log('Mongodb: Connexion established...'))
    .catch(() => console.log('Mongodb: Connexion failed'));
};
