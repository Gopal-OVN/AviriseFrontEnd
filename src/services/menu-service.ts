import { apiClients } from "../config/apiClients";

export const fetchMenuAPI = (): Promise<any> =>
    apiClients<any>('/menu/', 'GET').then(response => response.menus);