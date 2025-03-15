export type AudienceDataType = {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  position: string;
  lastLogin: string;
  checked: boolean;
};
export type MenuItem = {
  menu_id: number;
  menu_name: string;
  icon_name: string;
  parent_id: number | null;
  url: string;
  children?: MenuItem[];
};

export type CompanyDataType = {
  id: number;
  company: string;
  address: string;
  email: string;
  phone: string;
  contact_person: string;
  checked: boolean;
};

export type TableHeaderDataType = {
  id: number;
  inputId: string;
  label: string;
};

export type TaskDataType = {
  id: number;
  taskName: string;
  status: string;
  startDate: string;
  dueDate: string;
  assignedTo: string;
  priority: string;
};

export type LeadsDataType = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: string;
  description: string;
};

export type CustomerDataType = {
  customerId: number;
  name: string;
  phone: string;
  group: string;
  customerType: number;
  creditLimit: number;
  openingBalance: number;
  debit: string;
  credit: string;
  closingBalance: string;
  isChecked: boolean;
};

export type AllEmployeeDataType = {
  image: string;
  employeeId: number;
  name: string;
  section: string;
  phone: string;
  presentAddress: string;
};

export type AttendanceDataType = {
  date: string;
  name: string;
  employeeId: number;
  division: string;
  shift: string;
};

export type AllCustomerDataType = {
  name: string;
  userName: string;
  lastActive: string;
  dateRegistered: string;
  email: string;
  orders: number;
  totalSpent: number;
  city: string;
  postalCode: number;
  aov: number;
};


export type DriverDataType = {
  driver_id: number;
  name: string;
  license_no: string;
  email: string;
  phone_number: string;
  mission_type: string;
  is_active: boolean
};


export type AddressBookDataType = {
  address: string;
  address_book_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone_number: string;
  pincode?: string;
  is_active?: boolean;
  city_name?: string;
  state_name?: string;

};


export type OrderDataType = {
  order_id: string;
  // docket_no: number;
  display_docket: string;
  cod_amount: number
  payment_type: string;
  shipment_status_name: string;
  service_type_name: string;
  payment_mode_name: string;
  customer_name: string;
  gst_number: number;
  // address_book_name: string;
  // receiver_address_book: string;
  // sender_address_book: string;
  receiver_company_name: string;
  sender_company_name: string;
  parcel_type_name: string;
  shipment_value: number;
  invoice_no: number;
  e_way_bill: number;
  forwarding: number;
  booking_instruction: string;
  is_active?: boolean;

  total_box_size: number;
  total_no_of_box: number;
  dimension_type: string;
  total_volume: number;
  parcel_weight: number;
  is_fragile: boolean;
  is_manual_generate: boolean;
  is_docket_auto: boolean;
  pod: string;
};


export type ServiceTypeDataType = {
  service_id: string;
  name?: string;
  description?: string;
  is_active?: boolean;

};

export type PaymentModeDataType = {
  payment_id: string;
  payment_name?: string;
  description?: string;
  is_active?: boolean;

};

export type StateDataType = {
  name: string;
  state_code: string;
  is_active: boolean;
  id: string;
  state_name: string;
}


export type PickupRequestDataType = {
  pickup_type: string;
  pickup_date: string;
  sender: string;
  receiver: string;
  weight: string;
};



export type VendorDataType = {
  user_name: string;
  email: string;
  phone_number: string;

};

export type UserRole = "Customer" | "Vendor" | "Driver";

export type UserDataType2 = {
  name: string;
  userName: string;
  email: string;
  phone_number: string;
  role: UserRole;

  lastActive?: `${number}/${number}/${number}`; // Enforcing MM/DD/YYYY format
  dateRegistered?: `${number}/${number}/${number}`;
  orders?: number;
  totalSpent?: number;
  city?: string;
  postalCode?: number;
  aov?: number;

  business_name?: string;
  registrationDate?: `${number}/${number}/${number}`;

  driver_name?: string;
  owner_name?: string;
  mission_type?: string;
  vehicle_type?: string;
};



export type AllProductDataType = {
  id: number;
  product_name: string;
  category: string;
  sku: number;
  image: string;
  stock: number;
  price: number;
  sales: number;
  rating: number;
  published: string;
};

export type Option = {
  value: string;
  label: string;
};

export type CategoryDataType = {
  id: number;
  category_name: string;
  description: string;
  slug: string;
  count: number;
  image: string;
};

export type OrderListDataType = {
  order_id: number;
  customer_name: string;
  status: string;
  product_number: number;
  price: number;
  badge: string;
  delivery_status: string;
  order_date: string;
  payment_method: string;
};

export interface EventApi {
  id: string;
  title: string;
  start: string | Date;
  classNames: string[];
  allDay?: boolean;
  extendedProps?: { category: string };
}

export interface runsheetType {
  id: string;
  delivery_location: string;
  pincode: string;
  weight: string;
  packages: number;
  delivery_status: string;
};


export type FilterOption = {
  label: string;
  value: string | number;
};

export type MainfestDataType = {
  id: string;
  destination: string;
  weight: string;
  packages: number;
  dimensions: string;
  status: string;
};



export interface EmailDataType {
  id: number;
  name: string;
  email_content: string;
}
export interface ActiveStepState {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
}


export type ParcelTypeDataType = {
  parcel_id: string;
  parcel_name?: string;
  description?: string;
  is_active?: boolean;

};

export type VehicleDataType = {
  id: string;
  name?: string;
  vehicle_number?: string;
  insurance_validity?: Date;
  rc_validity?: Date;
  vehicle_type?: string;
  // driver_id?: number;
  // driver_name?: string;
  is_active?: boolean;

};

export type ShipmentStatusDataType = {
  shipment_status_id: string;
  shipment_status_name?: string;
  description?: string;
  is_active?: boolean;

};

export type OrderItemDataType = {
  order_item_id: number;
  total_parcel_weight?: number;
  number_of_box?: number;
  dimention_type?: string;
  total_volume?: number;
  parcel_hight?: number;
  parcel_width?: number;
  parcel_breadth?: number;
  volume?: number;
  parcel_weight?: number;
  is_fragile?: boolean;
  is_active?: boolean;

};


export type OrderTrackingDataType = {
  order_tracking_id: number;
  order_id: number;
  comment: string;
  docket: number;
  pod: string;
  shipment_status_name: string;
  is_active?: boolean;
}

export type RolePermissionDataType = {
  // role_permission_id: string;
  // permission_name?: string;
  role_name?: string;
  role_id?: number;
  permissions: { permission_id: number; permission_name: string }[];
  menus: { menu_id: number; menu_name: string }[];
  // permission_id?: number;
  // menu_name?: string;
  // is_active?: boolean;
};


export type MenuPrivilegeDataType = {
  id: string;
  menu_name?: string;
  role_name?: string;
  role_id?: number;
  menu_id?: number;
  is_active?: boolean;
};


