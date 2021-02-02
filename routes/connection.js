import express from 'express'
import { create, List, del } from '../controllers/connection.js'
const router = express.Router()

router.post('/', create)
router.get('/getorder', List)
router.delete('/:id', del)
export default router
