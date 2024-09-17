/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'users'
  },
  token: {
    type: String
  },
  tokenExpiration: {
    type: Date
  },
},
  { versionKey: false },
)

const Token = models.tokens || model('tokens', tokenSchema)

export default Token
