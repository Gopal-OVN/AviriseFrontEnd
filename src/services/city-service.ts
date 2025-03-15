


import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";



export const createCityAPI = (data:any): Promise<any> =>
  apiClients<any>('/cities/', 'POST', data)




export const updateCityAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/cities/${id}/`, 'PUT', data)



export const deleteCityAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/cities/${id}/`, 'DELETE')



// export const fetchCityAPI = (): Promise<any> =>
//   apiClient<any>('/cities/cities/', 'GET')


export const fetchCityAPI = (
  state_id?: number
): Promise<any> => {
  const params = {
    ...(state_id && { state_id: state_id }),
  };

  // Construct query string using URLSearchParams
  const queryString = new URLSearchParams(params as Record<string, string>).toString();

  return apiClient<any>(`/cities/${queryString ? `?${queryString}` : ''}`, 'GET');
};
