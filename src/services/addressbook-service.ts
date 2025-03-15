

import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchAddressbookAPI = (): Promise<any> =>
  apiClient<any>('/address_book/', 'GET').then(response => response.address_books);


export const createAddressbookAPI = (data:any): Promise<any> =>
  apiClients<any>('/address_book/', 'POST', data)




export const updateAddressbookAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/address_book/${id}/`, 'PUT', data)



export const deleteAddressbookAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/address_book/${id}/`, 'DELETE')

