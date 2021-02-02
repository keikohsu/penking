import md5 from 'md5'
import users from '../models/users.js'

// 新增使用者資料
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.password.length < 4) {
      res.status(400).send({ success: false, message: '密碼必須四個字以上' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼必須二十個字以下' })
    } else {
      // const result =
      await users.create({
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password),
        phone: req.body.phone,
        right: false
      })
      // console.log(result)
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
// 新增訂單
export const product = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      const arry = []
      console.log(req.body.length)
      for (let i = 0; i < req.body.length; i++) {
        arry.push({
          name: req.body[i].name,
          price: req.body[i].price,
          quantity: req.body[i].quantity
        })
      }
      console.log(arry)
      result = await users.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            orders: [
              {
                products: arry,
                total: req.body.total
              }
            ]
          }
        },
        { new: true }
      )
      console.log(req.body.total)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    }
  }
}
// 登入
export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    const result = await users.findOne(
      {
        account: req.body.account,
        password: md5(req.body.password)
      },
      '-password'
    )

    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
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
// 登出
export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

// 抓資料
export const userList = async (req, res) => {
  // 如果送出請求的帳號不是管理者
  if (!req.session.user.right) {
    res.status(401).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 編輯
export const edit = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(401).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
      console.log(error)
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除
export const del = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      // if (process.env.DEV === 'true') {
      //   fs.unlink('images/' + result.file, () => {})
      // }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 訂單刪除
export const dels = async (req, res) => {
  if (req.session.user === undefined || !req.session.user.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await users.findOneAndUpdate(
      {
        'orders._id': req.params.id
      },
      {
        // 刪除一個陣列元素
        $pull: {
          // 陣列欄位名稱
          orders: {
            // 刪除條件
            _id: req.params.id
          }
        }
      },
      { new: true }
    )
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      // if (process.env.DEV === 'true') {
      //   fs.unlink('images/' + result.file, () => {})
      // }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
      console.log(error)
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    }
  }
}

// 確認是否有登出
export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}
