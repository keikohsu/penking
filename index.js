import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// 登入的東西存在 mongodb
import connectMongo from 'connect-mongo'
// 記登入的東西
import session from 'express-session'
import routerUser from './routes/users.js'
import routerAlbum from './routes/albums.js'
import routerOrder from './routes/order.js'
import routerProductorder from './routes/productorder.js'
import routerConnection from './routes/connection.js'

// 引入users.js
// import profiles from './routes/api/profiles'
dotenv.config()

// Connect to mongodb
mongoose.connect(
  process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err))

const app = express()

// 使用body-parser中間件
// app.use(bodyParser.urlencoded({ extended: false }))
// 把抓到資料轉json檔
app.use(bodyParser.json())

// 跨域設定
app.use(cors({
  origin (origin, callback) {
    // 如果是 Postman 之類的後端, 允許
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true') {
        // 如果是本機開發 ，接受所有請求
        callback(null, true)
      } else if (origin.includes('github')) {
        // 如果設定不允許，但是從 github 過來的請求，允許
        callback(null, true)
      } else {
        // 如果設定不允許，也不是從github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)

const sessionSettings = {
  // 相簿加密的key
  secret: 'keiko',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}

if (process.env.DEV === 'false') {
  // 如果不是本機的開發環境，允許不同網域的認證
  sessionSettings.cookie.sameSite = 'none'
  // 如果是不同網域的認證，一定要設定 secure
  sessionSettings.cookie.secure = true
}

app.use(session(sessionSettings))

// 部署上 heroku 一定要設定
app.set('trust proxy', 1)

// 使用routes ，進到/albums的所有請求 分給routerAlbum處理
app.use('/albums', routerAlbum)
app.use('/users', routerUser)
app.use('/order', routerOrder)
app.use('/productorder', routerProductorder)
app.use('/connection', routerConnection)
// app.use('/api/profiles', profiles)

// bodyparser cors 之類的套件發生錯誤時的處理
// app.use((err, req, res, next) => {})

// err 發生的錯誤
// next 繼續到下一個 middleware，因為這是最後一個所以不需要
// _ 代表不使用 function 的參數
app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => { console.log(`http://localhost${process.env.PORT}`) })
