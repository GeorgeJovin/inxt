export interface LoginPayload {
  username: string
  password: string
}

export interface User {
  customerId: string
  lastLoginDateTime: string
}

export interface LoginResponse {
  msg: string
  customer_id: string
  last_login_date_time: string
}

export interface LogoutResponse {
  msg: string
  logout_time: string
}
