import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const ProductorderSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  total: {
    type: Number
  }
})

const productorder = mongoose.model('productorder', ProductorderSchema)

export default productorder
