import mongoose from 'mongoose'
const Schema = mongoose.Schema

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '商品名稱']
    },
    price: {
      type: String,
      required: [true, '標價']
    },
    remarks: {
      type: String,
      required: [true, '備註']
    },
    amount: {
      type: String,
      required: [true, '數量']
    },
    description: {
      type: String,
      maxlength: [300, '說明必須 200 字以下']
    },
    files: {
      type: Array,
      required: [true, '缺少檔案名稱']
    },
    number: {
      type: String
    },
    sort: {
      type: String
    }
  },
  {
    versionKey: false
  }
)

const albums = mongoose.model('albums', albumSchema)

export default albums
