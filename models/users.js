import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductorderSchema = new Schema({
  products: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number
  }
})

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: '請輸入名字'
    },
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號必須二十個字以下'],
      unique: true,
      required: '帳號必填'
    },
    password: {
      type: String,
      required: [true, '請輸入密碼']
    },
    phone: {
      type: String,
      required: '請輸入電話'
    },
    right: {
      type: Boolean
    },
    orders: {
      type: [ProductorderSchema]
    }
  },
  {
    versionKey: false
  }
)

const users = mongoose.model('users', userSchema)

export default users
