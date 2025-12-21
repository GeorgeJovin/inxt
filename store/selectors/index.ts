import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const selectAuthState = (state: RootState) => state.auth
const selectCustomerState = (state: RootState) => state.customer
const selectDeviceState = (state: RootState) => state.device

export const selectAuth = createSelector(
  [selectAuthState],
  (auth) => ({
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    hasSeenWelcome: auth.hasSeenWelcome,
  })
)


export const selectRooms = createSelector(
  [selectCustomerState],
  (customer) => customer.rooms
)

export const selectDevices = createSelector(
  [selectDeviceState],
  (device) => device.devices
)


export const selectGlobalLoading = createSelector(
  [selectDeviceState, selectCustomerState, selectAuthState],
  (device, customer, auth) =>
    device.loading || customer.loading || auth.loading
)
