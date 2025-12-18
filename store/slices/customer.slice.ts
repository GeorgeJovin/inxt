import { CustomerState, Room } from '@/types/customer.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: CustomerState = {
  rooms: [],
  loading: false,
  error: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomerStart(state) {
      state.loading = true
      state.error = null
    },
    fetchCustomerSuccess(state, action: PayloadAction<Room[]>) {
      state.loading = false
      state.rooms = action.payload
    },
    fetchCustomerFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    clearCustomer(state) {
      state.rooms = []
    },
  },
})

export const {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailure,
  clearCustomer,
} = customerSlice.actions

export default customerSlice.reducer
