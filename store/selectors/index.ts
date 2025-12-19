import { RootState } from '../index'

export const selectAuth = (state: RootState) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
})
export const selectRooms = (state: RootState) => state.customer.rooms
export const selectDevices = (state: RootState) =>
  state.device.devices
export const selectGlobalLoading = (state: RootState) =>
  state.device.loading ||
  state.customer.loading ||
  state.auth.loading