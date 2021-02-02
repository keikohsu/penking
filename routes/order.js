import express from 'express'
import { create, orderList, del } from '../controllers/order.js'
const router = express.Router()

router.post('/', create)
router.get('/getorder', orderList)
router.delete('/:id', del)
export default router
