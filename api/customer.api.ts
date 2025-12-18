import { CustomerDetailsResponse } from '@/types/customer.types'
import api from './axios'
import { ENV } from '@/configs/env'
import { ENDPOINTS } from './endpoint'

export const fetchCustomerDetailsApi = async (
  customerId: string
): Promise<CustomerDetailsResponse> => {
  const response = await api.post<CustomerDetailsResponse>(
   ENDPOINTS.CUSTOMERDETAILS,
    {
      api_key: ENV.API_KEY,
      customer_id: customerId,
    }
  )

  return response.data
}
