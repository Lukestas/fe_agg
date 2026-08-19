export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  dni: number;
  password: string;
}
