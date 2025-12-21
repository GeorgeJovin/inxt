import { extractNumber } from '@/components/helper'
import { Device, DeviceState } from '@/types/devices.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
}
const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    fetchDevicesStart(state) {
      state.loading = true
      state.error = null
    },
    fetchDevicesSuccess(state, action: PayloadAction<Device[]>) {
      state.loading = false
      state.devices = action.payload
    },
    fetchDevicesFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    clearDevices(state) {
      state.devices = []
    },
    mqttToggleStart(state) {
    state.loading = true
    },
    mqttToggleEnd(state) {
    state.loading = false
    },
    updateDeviceStatus(
      state,
      action: PayloadAction<{
        deviceId: number
        status: 'ON' | 'OFF'
      }>
    ) {
      const device = state.devices.find(
        (d) => extractNumber(d.device_id) === action.payload.deviceId
      )

      if (device) {
        device.device_status = action.payload.status
      }
    },
  },
})

export const {
  fetchDevicesStart,
  fetchDevicesSuccess,
  fetchDevicesFailure,
  clearDevices,
  updateDeviceStatus,
  mqttToggleStart,
  mqttToggleEnd,
} = deviceSlice.actions

export default deviceSlice.reducer
