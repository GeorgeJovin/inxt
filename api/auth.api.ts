import { LoginPayload, LoginResponse } from '@/types/auth.types'
import api from './axios'
import { ENDPOINTS } from './endpoint'

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      ENDPOINTS.LOGIN,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}
