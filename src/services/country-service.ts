


import { apiClient } from "../config/apiClient";
import { apiClients } from "../config/apiClients";


export const fetchCountryAPI = (): Promise<any> =>
  apiClient<any>('/countries/countries/', 'GET')



export const createBranchAPI = (data:any): Promise<any> =>
  apiClients<any>('/branches/', 'POST', data)


export const updateBranchAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/branches/${id}/`, 'PUT', data)



export const deleteBranchAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/branches/${id}/`, 'DELETE')

// export const createApprovedUsersAPI = ( data: any) =>
//   apiRequest<any>(`/superusers/`, 'POST', data); 




export const 
fetchStateAPI = (
  country_id?: number
): Promise<any> => {
  const params = {
    ...(country_id && { country_id: country_id }),
  };

  // Construct query string using URLSearchParams
  const queryString = new URLSearchParams(params as Record<string, string>).toString();

  return apiClient<any>(`/states/${queryString ? `?${queryString}` : ''}`, 'GET');
};




export const createStateAPI = (data:any): Promise<any> =>
  apiClients<any>('/states/', 'POST', data)




export const updateStateAPI = ( id:any , data:any,): Promise<any> =>
  apiClients<any>(`/states/${id}/`, 'PUT', data)



export const deleteStateAPI = ( id:any): Promise<any> =>
  apiClients<any>(`/states/${id}/`, 'DELETE')



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

  return apiClient<any>(`/cities/cities/${queryString ? `?${queryString}` : ''}`, 'GET');
};
