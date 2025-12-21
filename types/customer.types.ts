export interface Room {
  category_id: string
  category_name: string
}

export interface CustomerDetailsResponse {
  msg: string
  product_list: Room[]
}

export interface CustomerState {
  rooms: Room[]
  loading: boolean
  error: string | null
}