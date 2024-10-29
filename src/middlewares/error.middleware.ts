import { Request, Response, NextFunction } from 'express'
//file ding95 nghĩa làm handle tổng
//nơi mà các lỗi từ toàn bộ hệ thống đổ về đây
//loo64 từ validate đỗ về có mã 422 mình có thể tận dụng
//      doio96 khi trong validate có lỗi đặc biệt có dạng ErrorWStatus
//lỗi từ controller có thể là lỗi do mình ErrorwStatus
//      lỗi rớt mạng thì k có status

import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

//=> lỗi từ cac nơi đỗ về có thể có, hoặc ko có status
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(error, ['status']))
}
