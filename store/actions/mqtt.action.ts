import { AppDispatch } from '@/store'
import { mqttDeviceApi } from '@/api/mqtt.api'
import {
  updateDeviceStatus,
  mqttToggleStart,
  mqttToggleEnd,
} from '../slices/device.slice'

export const toggleMqttDevice =
  (params: {
    customerId: string
    listId: number
    deviceId: number
    currentStatus: 'ON' | 'OFF'
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(mqttToggleStart())
      const nextStatus = params.currentStatus === 'ON' ? 'OFF' : 'ON'

      const response = await mqttDeviceApi({
        customerId: params.customerId,
        listId: params.listId,
        deviceId: params.deviceId,
        deviceStatus: nextStatus,
      })

      dispatch(
        updateDeviceStatus({
          deviceId: params.deviceId,
          status: response.current_status,
        })
      )
    } catch (error) {
      console.error('MQTT toggle failed', error)
    }finally {
     dispatch(mqttToggleEnd())
    }
  }
