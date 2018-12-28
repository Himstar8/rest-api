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
  likedShops: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    { timestamps: true }
  ]
});

userSchema.methods.addShop = function(id) {
  if (this.likedShops.indexOf(id) === -1) {
    this.likedShops.push(id);
  }

  return this.save();
};

userSchema.methods.removeShop = function(id) {
  this.likedShops.remove(id);
  return this.save();
};

userSchema.plugin(UniqueValidator, { message: 'is already taken.' });

export default mongoose.model('User', userSchema);
