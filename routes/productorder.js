import express from 'express'
import { create, findByIdAndUpdate } from '../controllers/productorder.js'
const router = express.Router()

router.post('/', create)
router.post('/findByIdAndUpdate', findByIdAndUpdate)

export default router
