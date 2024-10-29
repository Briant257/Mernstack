import { Request, Response, NextFunction, RequestHandler } from 'express'
//-viết hàm wrapAsync
//wrapAsync là hàm nhận vào req handler (middleware và controller)
// 'req handler' này k có cấu trúc try catch next
//warpAsync sẽ nhận cà trả về 1 req handler khác
//dc tạo từ try catch next và req handler ban đầu
export const warpAsync = (func: RequestHandler) => {
  //đưa func và nhận dc req handler mới
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
