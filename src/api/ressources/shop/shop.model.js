import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    place_id: {
      type: String,
      required: true,
      unique: true
    },
    photo_reference: {
      type: String,
      required: true
    },
    rating: Number,
    types: Array,
    vicinity: String
  },
  { timestamps: true }
);

shopSchema.methods.toJSON = function() {
  return {
    id: this._id,
    name: this.name,
    place_id: this.place_id,
    rating: this.rating,
    types: this.types,
    photo_reference: this.photo_reference,
    vicinity: this.vicinity
  };
};

shopSchema.plugin(UniqueValidator, { message: 'is already taken.' });

export default mongoose.model('Shop', shopSchema);
