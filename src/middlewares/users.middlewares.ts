// import các interface của express để sử dụng cho việc định nghĩa
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
// middlewares là 1 handler có nhiệm vụ kiểm tra các giá
//trị mả ngưởi dủng gữi lên sever
//nếu mà kiểm tra thành công thì mình next()
//nếu mà kiểm tra ko oke thì mình res.js

//mô phỏng người dùng muốn login(đăng nhập)
//họ gửi req email và password lên server
//req này phải đi qua meddlewares này trước

//vậy meddlewares này sẽ chạy khi người dùng muốn login
//và middlewares này sẽ kiểm tra email và password

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.body)
  const { email, password } = req.body //lấy email và password trong req ra ktr
  //nếu 1 trong 2 k dc gửi lên

  if (!email || !password) {
    res.status(400).json({
      message: 'Missing email or password'
    })
  } else {
    next() //nếu ko bị gì cả thì next
  }
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Name is required'
      },
      isString: {
        errorMessage: 'Name must be string'
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: "Name's length is between 1 and 100"
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Email is required'
      },
      isEmail: {
        errorMessage: 'Email is invalid'
      },
      trim: true
    },
    password: {
      notEmpty: {
        errorMessage: 'PassWord is required'
      },
      isString: {
        errorMessage: 'Password must be string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: "Password's length must be between 8 andn 50 "
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
          // returnScore: true // dùng để đánh giá pass word mạnh hay yếu
        },
        errorMessage:
          'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: 'Password is required'
      },
      isString: {
        errorMessage: 'Password must be string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: "Password's length must be between 8 andn 50 "
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
          // returnScore: true // dùng để đánh giá pass word mạnh hay yếu
        },
        errorMessage:
          'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          //value chính là confirm_password
          if (value !== req.body.password) {
            throw new Error("Password confirmation doesn't match password")
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
