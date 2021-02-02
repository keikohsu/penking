import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const OrderSchema = new Schema({
  // 客戶名
  name: {
    type: String,
    required: true
  },
  // 手機 09XXXX
  cellphone: {
    type: String
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
  // 地址
  address: {
    type: String
  },
  // 備註
  remark: {
    type: String
  },
  // 出貨
  delivery: {
    type: String
  },
  // 付款
  cash: {
    type: String
  },
  // 發票
  invoice: {
    type: String
  },
  // 訂購時間
  date: {
    type: Date,
    default: Date.now
  }
})

const order = mongoose.model('order', OrderSchema)

export default order
