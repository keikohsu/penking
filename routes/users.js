import express from 'express'
import { create, login, logout, heartbeat, userList, del, edit, product, dels } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/user', userList)
router.get('/heartbeat', heartbeat)

router.delete('/:id', del)
router.delete('/order/:id', dels)

router.patch('/:id', edit)

router.post('/:id', product)

export default router
