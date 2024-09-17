/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const imageSchema = new Schema({
  title: {
    type: String
  },
  image: {
    type: String
  }
}, {
  versionKey: false,
});

const Image = models.images || model('images', imageSchema)

export default Image
