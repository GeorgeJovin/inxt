export interface MqttResponse {
  msg: string
  current_status: 'ON' | 'OFF'
}
