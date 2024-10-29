// dựng server voiws express
import express from 'express'
import userRouter from './routes/users.routers'
import databaseServices from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middleware'

//dùng express tạo server(app)
const app = express()
const PORT = 3000
databaseServices.connect() //kết noio61 database
//cho sever chạy middlewares chuyển json
app.use(express.json())
//handler
//server dùng userRouer
app.use('/users', userRouter)

//xử lý lỗi hệ thống
app.use(defaultErrorHandler)
//app mở ở PORT 3000
//http://localhost:3000/users/login req.body {email và password}
app.listen(PORT, () => {
  console.log('SERVER BE đang chạy trên port: ' + PORT)
})
