export interface DeviceApiResponse {
  msg: string
  device_details: {
    device_id: string
    device_name: string
    device_type: string
    device_status: 'ON' | 'OFF'
    device_speed_temp: string
  }[]
}

export interface Device {
  device_id: string
  device_name: string
  device_type: string
  device_status: 'ON' | 'OFF' | 'On' | 'Off'
  device_speed_temp: string
}

export interface DeviceState {
  devices: Device[]
  loading: boolean
  error: string | null
}

