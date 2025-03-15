
export type ContactPerson = {
  name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
};

export type CompanyDataType = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  pincode: string
  industry_type_name: string;
  globle_status_name: string;
  contact_persons: ContactPerson[];
}


export type FilterDataType = {
  page?: number,
  pageSize?: number,
  name?: string,
  email?: string,
  roleId?: number,
  companyId?: number,
  branchId?: number
}