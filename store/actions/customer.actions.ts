import { AppDispatch } from '@/store'
import { fetchCustomerDetailsApi } from '@/api/customer.api'
import {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailure,
} from '../slices/customer.slice'

export const fetchCustomerDetails =
  (customerId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCustomerStart())

      const response = await fetchCustomerDetailsApi(customerId)

      dispatch(fetchCustomerSuccess(response.product_list))
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.msg ||
        'Failed to load rooms'

      dispatch(fetchCustomerFailure(message))
    }
  }
