

import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchPaymentModeAPI = (): Promise<any> =>
  apiClient<any>('/payment_modes/', 'GET').then(response => response.payments);


export const createPaymentModeAPI = (data:any): Promise<any> =>
  apiClients<any>('/payment_modes/', 'POST', data)




export const updatePaymentModeAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/payment_modes/${id}/`, 'PUT', data)



export const deletePaymentModeAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/payment_modes/${id}/`, 'DELETE')

