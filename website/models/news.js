/* eslint-disable prettier/prettier */
import { Schema, model, models } from 'mongoose';

const newsSchema = new Schema({
  label: {
    type: String
  },
  image: {
    type: Schema.Types.ObjectId, ref: 'images',
    required: true
  }
  // se khong co topics nhung se co them muc category va isOn de kiem soat xem no co len dau muc khong
  // category: {
  //   type: Schema.Types.ObjectId, ref:'categories',
  //   required: true
  // }

  // isOn: {
  //   type: Boolean,
  //   required: true
  // }
  // ....
}, {
  versionKey: false,
});

const News = models.news || model('news', newsSchema)

export default News
