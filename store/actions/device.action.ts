import { AppDispatch } from '@/store'
import { fetchDevicesApi } from '@/api/device.api'
import {
  fetchDevicesStart,
  fetchDevicesSuccess,
  fetchDevicesFailure,
} from '../slices/device.slice'

export const fetchDevices =
  (customerId: string, listId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchDevicesStart())

      const response = await fetchDevicesApi(customerId, listId)

      dispatch(fetchDevicesSuccess(response.device_details))
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.msg ||
        'Failed to load devices'

      dispatch(fetchDevicesFailure(message))
    }
  }
