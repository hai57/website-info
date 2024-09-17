/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const iconSchema = new Schema({
  label: {
    type: String
  },
  image: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
});

const Icon = models.icons || model('icons', iconSchema)

export default Icon
