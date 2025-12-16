import { AppDispatch } from '@/store'
import { loginApi } from '@/api/auth.api'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../slices/auth.slice'
import { LoginPayload } from '@/types/auth.types'

export const loginUser =
  (payload: LoginPayload) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart())

      const response = await loginApi(payload)

      dispatch(loginSuccess(response.user))
    } catch (error: any) {
      dispatch(loginFailure(error.message))
    }
  }
