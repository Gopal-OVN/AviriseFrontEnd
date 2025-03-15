// models/auth.ts

export interface Token {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: any;
  error?: string;
  message?: string;
  permissions?: string[];
  menus?: [];
  me?: [];

}




export interface SignupResponse {
  message: string;
  error?: string;
}

export interface Response {
  message: string;
  error?: string;
}

export interface ResetPasswordResponse {
  message: string;
  error?: string;

}
