import { MqttResponse } from '@/types/mqtt.types'
import api from './axios'
import { ENDPOINTS } from './endpoint'
import { ENV } from '@/configs/env'

export const mqttDeviceApi = async (params: {
  customerId: string
  listId: number
  deviceId: number
  deviceStatus: 'ON' | 'OFF'
}): Promise<MqttResponse> => {
  const response = await api.post<MqttResponse>(
    ENDPOINTS.MQTT_DEVICE,
    {
      api_key: ENV.API_KEY,
      customer_id: params.customerId,
      list_id: params.listId,
      device_id: params.deviceId,
      device_status: params.deviceStatus,
    }
  )

  return response.data
}
