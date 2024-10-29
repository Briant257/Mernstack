import { rejects } from 'assert'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// file này chứa hàm dùng để tạo ra token bằng công nghệ jwt
// hàm chỉ tạo ra token chứ ko phải tạo ra ac hay rf
export const signToken = ({
  payload,
  privatekey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privatekey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privatekey, options, (error, token) => {
      if (error) throw reject(error)
      else resolve(token as string)
    })
  })
}
