import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import albums from '../models/albums.js'

dotenv.config()

let storage

// 本機開發，檔案存電腦
// 雲端環境，檔案存 FTP
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'images/')
    },
    filename(req, file, callback) {
      setTimeout(() => {
        // 給他時間才不會重複圖片
        callback(null, Date.now() + path.extname(file.originalname))
      }, 30)
    }
  })
} else {
  storage = new FTPStorage({
    // FTP 登入設定
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名
    // 路徑為 FTP 的絕對路徑
    destination(req, file, options, callback) {
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

// 新增
export const create = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  upload.array('image', 5)(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
        console.log(error)
      }

      res.status(400).send({ success: false, message })
      // console.log('123')
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    } else {
      try {
        const files = []
        if (process.env.DEV === 'true') {
          for (let i = 0; i < req.files.length; i++) {
            files.push({ file: req.files[i].filename, display: true })
            // console.log(req.files[i])
          }
        } else {
          for (let i = 0; i < req.files.length; i++) {
            files.push({ file: path.basename(req.files[i].path), display: true })
          }
        }
        const result = await albums.create({
          user: req.session.user._id,
          description: req.body.description,
          name: req.body.name,
          price: req.body.price,
          amount: req.body.amount,
          remarks: req.body.remarks,
          sort: req.body.sort,
          number: req.body.number,
          files
        })
        console.log(result)
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
  })
}
// 編輯
export const edit = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await albums.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await albums.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除
export const deletee = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    console.log(req.session.user)
    return
  }

  try {
    let result = await albums.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await albums.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
// 權限
export const user = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.user) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await albums.find({ user: req.params.user })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 取圖片
export const file = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    })
      .then(ress => {
        ress.data.pipe(res)
      })
      .catch(error => {
        res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
      })
  }
}

// 拿到全部的檔案
export const getAllProduct = async (req, res) => {
  // if (!req.session.user.right) {
  //   res.status(401).send({ success: false, message: '沒有權限' })
  //   return
  // }
  try {
    const result = await albums.find({})
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
