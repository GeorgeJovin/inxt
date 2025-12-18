import api from './axios'
import { ENDPOINTS } from './endpoint'
import { LoginPayload, LoginResponse, LogoutResponse } from '@/types/auth.types'
import { getLatLong } from '@/utils/location'
import { getIpAddress } from '@/utils/address'
import { ENV } from '@/configs/env'

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const [location, ip] = await Promise.all([
    getLatLong(),
    getIpAddress(),
  ])

  const response = await api.post<LoginResponse>(
    ENDPOINTS.LOGIN,
    {
      api_key: ENV.API_KEY,
      username: payload.username,
      password: payload.password,
      location,
      ip_address: ip,
    }
  )

  return response.data
}
export const logoutApi = async (
  customerId: string
): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>(
    ENDPOINTS.LOGOUT,
    {
      api_key: ENV.API_KEY,
      customer_id: customerId,
    }
  )

  return response.data
}