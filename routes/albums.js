import express from 'express'
import { create, edit, deletee, user, file, getAllProduct } from '../controllers/albums.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/', getAllProduct)
router.get('/user/:user', user)
router.get('/file/:file', file)

export default router
