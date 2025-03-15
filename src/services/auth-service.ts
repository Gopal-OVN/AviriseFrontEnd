// import { LoginSchema } from '@/validators/login.schema';
// import { LoginResponse, ResetPasswordResponse, SignupResponse } from '../models/auth/auth-model';
// import { SignUpSchema } from '@/validators/signup.schema';
// import { ForgetPasswordSchema } from '@/validators/forget-password.schema';
// import { ResetPasswordSchema } from '@/validators/reset-password.schema';
// import { apiClient } from '@/config/apiClient';

import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";
import { LoginResponse, ResetPasswordResponse } from "../models/auth/auth-models";
// import { LoginSchema } from "../validators/login.schema";

// Generic type to ensure the response has an optional 'error' property
// interface ApiResponse {
//   error?: string;
// }

// const apiRequest = async <T extends ApiResponse>(
//   url: string,
//   method: 'POST',
//   data?: object
// ): Promise<T> => {
//   const response = await fetch(url, {
//     method,
//     headers: { 'Content-Type': 'application/json' },
//     body: data ? JSON.stringify(data) : undefined,
//   });

//   const result = (await response.json()) as T;

//   if (!response.ok) {
//     const errorMessage = result.error || 'An error occurred';
//     throw new Error(errorMessage);
//   }

//   return result;
// };

// export const login = (data: LoginSchema): Promise<LoginResponse> =>
//   apiClient<LoginResponse>('auth/?action=login', 'POST', data);

export const loginAPI = (data: any): Promise<LoginResponse> =>
  apiClient<LoginResponse>('/auth/login', 'POST', data,);



// export const signup = (data: SignUpSchema): Promise<SignupResponse> =>
//   apiClient<SignupResponse>('auth/?action=register', 'POST', data);

export const forgotpassword = (data: any): Promise<LoginResponse> =>
  apiClient<LoginResponse>('/auth/forgot-password/', 'POST', data);


export const fetchRoleAPI = (): Promise<any> =>
  apiClient<any>('/roles/', 'GET')

export const updatePasswordAPI = (old_password: string, new_password: string): Promise<any> => {
  const queryParams = new URLSearchParams({
    old_password: old_password,
    new_password: new_password,
  });

  return apiClients<any>(`/auth/update-password?${queryParams.toString()}`, 'PUT');
};

// export const profileAPI = (): Promise<any> =>
//   apiClient<any>('profile/', 'GET');


// export const fetchRolesApi = (): Promise<any> =>
//   apiClient<any>('role/', 'GET');

// export const fetchStatusApi = (): Promise<any> =>
//   apiClient<any>('status/', 'GET');

export const resetPasswordAPI = (
  data: any

): Promise<ResetPasswordResponse> =>
  apiClient<ResetPasswordResponse>(
    '/auth/reset-password/', 'POST', data);



// export const LogOut = () => {
//   // Clear access token from localStorage
//   console.log("logout call")
//   localStorage.removeItem('accessToken');

//   // Redirect to the homepage
//   window.location.href = 'http://localhost:3000/auth/sign-in';
// };