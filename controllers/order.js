// import { application } from 'express'
import order from '../models/order.js'

export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    const result = await order.create({
      // user: req.session.user._id,
      name: req.body.name,
      cellphone: req.body.cellphone,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      remark: req.body.remark,
      delivery: req.body.delivery,
      cash: req.body.cash,
      invoice: req.body.invoice
      // date: req.body.date
      // file
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const orderList = async (req, res) => {
  // 如果送出請求的帳號不是管理者
  if (!req.session.user.right) {
    res.status(401).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await order.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 刪除
export const del = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    let result = await order.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await order.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      // if (process.env.DEV === 'true') {
      //   fs.unlink('images/' + result.file, () => {})
      // }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
