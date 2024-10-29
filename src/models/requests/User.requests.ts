//định nghĩa những gì mà người dùng gửi lên trong request
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}
