import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const ConnectionSchema = new Schema({
  // 客戶名
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  // 手機 09XXXX
  cellphone: {
    type: String,
    required: true
  },
  // 電話02-XXXX
  phone: {
    type: String
  },
  // 信箱
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    maxlength: [300, '說明必須 200 字以下']
  },
  // 訂購時間
  date: {
    type: Date,
    default: Date.now
  }
})

const connection = mongoose.model('connection', ConnectionSchema)

export default connection
