export interface LoginRequest {
  dni: number;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  dni: number;
  password: string;
}
