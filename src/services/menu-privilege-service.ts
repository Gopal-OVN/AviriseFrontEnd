

import { apiClients } from "../config/apiClients";


export const fetchMenuListAPI = (id: any): Promise<any> =>
  apiClients<any>(`/menu_privilege/menu-list?role_id=${id}`, 'GET').then(response => response.menu_list);


export const fetchMenuPrivilegeAPI = (): Promise<any> =>
  apiClients<any>('/menu_privilege/', 'GET').then(response => response.menu_privilege);

export const createMenuPrivilegeAPI = (data: any): Promise<any> =>
  apiClients<any>('/menu_privilege/', 'POST', data)

export const updateMenuPrivilegeAPI = (id: any, data: any,): Promise<any> =>
  apiClients<any>(`/menu_privilege/${id}/`, 'PUT', data)

export const deleteMenuPrivilegeAPI = (id: any): Promise<any> =>
  apiClients<any>(`/menu_privilege/${id}/`, 'DELETE')
