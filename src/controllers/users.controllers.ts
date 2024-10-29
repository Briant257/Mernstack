import { NextFunction, Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/User.requests'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
// controller là handler có nhiệm vụ xử lý logic
// các thông tin khi đã vào controller thì clean
export const loginController = (req: Request, res: Response) => {
  // vào đây là ko kiểm tra dữ liệu nữa
  // chỉ cần dùng mà thôi
  const { email, password } = req.body
  // vào database kiểm tra đúng hay không?
  // xà lơ
  if (email == 'hoangnamlongho@gmail.com' && password == 'NKC280824chi') {
    res.status(200).json({
      message: 'Login success',
      data: {
        fname: 'Điệp',
        age: 1999
      }
    })
  } else {
    res.status(400).json({
      message: 'invalid email or password'
    })
  }
}
// registerController nhận vào thông tin đăng ký của người dùng
// và vào database để tạo user mới lưu vào
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  // vào data và nhét vào collection users
  // kiểm tra email có tồn tại chưa | có ai dùng email này chưa| email có bị trùng không ?
  const isDup = await usersServices.checkEmailExist(email)
  if (isDup) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: 'Email has been used'
    })
  }
  const result = await usersServices.register(req.body)
  res.status(201).json({
    message: 'Register success',
    data: result
  })
}
