export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  token: string;
}

export interface LoginResponse {
  user: User;
}
