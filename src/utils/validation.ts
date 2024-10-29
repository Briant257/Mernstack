import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

//hàm validate sẽ sài validate(checkSchema({...}))
//và checkSchema sẽ return RunnableValidationChains<ValidationChain>
//nên mình dịnh nghĩa validate là hàm nhận vào
// can be reused by many routes
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //lôi thằng checkSchema ra để lấy danh sách lỗi
    await validations.run(req) //funct này cũng lấy lỗi từ req
    const errors = validationResult(req) //lập danh sách lỗi trong req

    if (errors.isEmpty()) {
      return next()
    } else {
      const errorsObject = errors.mapped() //danh sách các lỗi dạng obj
      const entityError = new EntityError({ errors: {} }) //đây là obj lỗi mà mình muốn thay thế
      //duyệt key
      for (const key in errorsObject) {
        //lấy msg trong từng trường dữ liệu của errorObject ra
        const { msg } = errorsObject[key]
        //nếu msg có dạng ErrorWithSatus và có status khác 422 thì mình next(err) nó ra trc
        if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }
        //nếu k phài dạng đặc biệt thì mình bỏ vào entityError
        entityError.errors[key] = msg
      }
      next(entityError)
    }
  }
}
