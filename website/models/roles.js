/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
});

const Role = models.roles || model('roles', roleSchema)

export default Role
