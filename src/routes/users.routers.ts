import { error } from 'console'
import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { warpAsync } from '~/utils/handlers'
//tạo route
const userRouter = express.Router()
//setup middlewares
// /users/login
userRouter.post('/login', loginValidator, loginController)

/*
Description: Register a new user
Path: users/register
Method: POST
Body:{
    name: string 
    email: string,
    password: string,
    confirm_password:string
    date_of_birth: ISO8601
}
*/
userRouter.post('/register', registerValidator, warpAsync(registerController))

/*
userRouter.post(
  '/register',
  registerValidator,
  async (req, res, next) => {
    console.log('RQ 1')
    //-call server bà server database rớt mạng nên dẫn đến bug
    // throw new Error('RQ1 rớt mạng')
    //-throw chạy đâu cũng dc trừ async
    // next(new Error('RQ1 rớt mạng')) //next(error)
    //-chỉ thk next chạy dc trên async
    //-ta dùng next dùng khá nhiều so với throw

    //-next chạy dc trên bắt đồng bộ và (throw chỉ chay dc) đồng bộ
    // try {
    //   throw new Error('RQ1 rớt mạng')
    // } catch (error) {
    //   next(error)
    // }
    // Promise.reject(new Error("RQ1 rớt mạng")).catch((error) => next (error)) //ko ai sài cái này cả - điên mới sài

  },
  (req, res, next) => {
    console.log('RQ 2')
    next()
  },
  (req, res, next) => {
    console.log('RQ 3')
    res.json({ message: 'successfully' })
  },
  (error, req, res, next) => {
    res.status(400).json({ message: error.message })
  }
)
*/
export default userRouter
