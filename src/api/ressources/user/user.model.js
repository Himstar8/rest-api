import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  shops: {
    type: Array,
    default: []
  }
});

userSchema.plugin(UniqueValidator, { message: 'is already taken.' });

export default mongoose.model('User', userSchema);
