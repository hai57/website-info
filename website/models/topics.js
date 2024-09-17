/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const TopicSchema = new Schema({
  title: {
    type: String
  },
  newsContainer: [
    {
      newsId: {
        type: Schema.Types.ObjectId, ref: 'news'
      }
    }
  ]
}, {
  versionKey: false,
});

const Topics = models.topics || model('topics', TopicSchema)

export default Topics
