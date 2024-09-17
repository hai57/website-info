/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  role: {
    type: Schema.Types.ObjectId, ref: 'role'
  },
  username: {
    type: String,
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
},
  { versionKey: false, timestamps: true },
)

const User = models.users || model('users', userSchema)

export default User
