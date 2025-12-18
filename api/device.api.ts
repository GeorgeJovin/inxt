import api from './axios'
import { ENV } from '@/configs/env'
import { ENDPOINTS } from './endpoint'
import { DeviceApiResponse } from '@/types/devices.types'

export const fetchDevicesApi = async (
  customerId: string,
  listId: number
): Promise<DeviceApiResponse> => {
  const response = await api.post<DeviceApiResponse>(
    ENDPOINTS.DEVICE_LIST,
    {
      api_key: ENV.API_KEY,
      customer_id: customerId,
      list_id: listId,
    }
  )

  return response.data
}
