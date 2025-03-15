

const allDriverHeaderData = [
  {
    id: 1,
    inputId: "showDriverName",
    label: "Driver Name",
  },
  {
    id: 2,
    inputId: "showOwnerName",
    label: "Owner Name",
  },
  {
    id: 3,
    inputId: "showEmail",
    label: "Email",
  },
  {
    id: 4,
    inputId: "showPhoneNumber",
    label: "Phone Number",
  },
  {
    id: 5,
    inputId: "showMissionType",
    label: "Mission Type",
  }
];


const allDriverData = [
  {
    driver_name: "John Doe",
    owner_name: "Jane Doe",
    email: "johndoe@example.com",
    phone_number: "+1234567890",
    mission_type: "Delivery"
  },
  {
    driver_name: "Alice Johnson",
    owner_name: "Bob Johnson",
    email: "alicejohnson@example.com",
    phone_number: "+1987654321",
    mission_type: "Transport"
  },
  {
    driver_name: "Michael Smith",
    owner_name: "Emma Smith",
    email: "michaelsmith@example.com",
    phone_number: "+1122334455",
    mission_type: "Logistics"
  },
  {
    driver_name: "Chris Evans",
    owner_name: "Sarah Evans",
    email: "chrisevans@example.com",
    phone_number: "+1555666777",
    mission_type: "Cargo"
  },
  {
    driver_name: "Olivia Brown",
    owner_name: "James Brown",
    email: "oliviabrown@example.com",
    phone_number: "+1444333222",
    mission_type: "Courier"
  }
];




const allVendorHeaderData = [
  {
    id: 1,
    inputId: "showUserName",
    label: "User Name",
  },
  {
    id: 2,
    inputId: "showEmail",
    label: "Email",
  },
  {
    id: 3,
    inputId: "showPhoneNumber",
    label: "Phone Number",
  },
  {
    id: 4,
    inputId: "showActiveStatus",
    label: "Active",
  },
  {
    id: 5,
    inputId: "showAction",
    label: "Action",
  }
];



const allVendorData = [
  {
    "user_name": "akshaymarjit@gmail.com",
    "email": "akshaymarjit@gmail.com",
    "phone_number": "9679963388",

  },
  {
    "user_name": "thecourierhubguntur@gmail.com",
    "email": "thecourierhubguntur@gmail.com",
    "phone_number": "9573865130",

  },
  {
    "user_name": "support@vendor.com",
    "email": "support@vendor.com",
    "phone_number": "0123456",

  }
]



const allAddressBookData = [
  {
    "company": "G4Viruz G4 Security",
    "account_code": "000009",
    "contact_person": "Daniel Uzor",
    "phone": "+2348073005981",
    "email": "jmarshkeisha@gmail.com",
    "address_type": "International"
  },
  {
    "company": "Acme Corporation",
    "account_code": "123456",
    "contact_person": "Jane Smith",
    "phone": "+15551239876",
    "email": "jane.smith@acme.com",
    "address_type": "Domestic"
  },
  {
    "company": "Beta Industries",
    "account_code": "987654",
    "contact_person": "David Lee",
    "phone": "+447911123456",
    "email": "david.lee@beta.co.uk",
    "address_type": "Europe"
  },
  {
    "company": "Gamma Solutions",
    "account_code": "456789",
    "contact_person": "Maria Garcia",
    "phone": "+34612345678",
    "email": "maria.garcia@gamma.es",
    "address_type": "Spain"
  },
  {
    "company": "Delta Enterprises",
    "account_code": "789012",
    "contact_person": "Kenji Tanaka",
    "phone": "+819012345678",
    "email": "kenji.tanaka@delta.jp",
    "address_type": "Japan"
  }
]



const pickupRequestHeaderData = [
  {
    id: 1,
    inputId: "showPickupType",
    label: "Pickup Type",
  },
  {
    id: 2,
    inputId: "showPickupDate",
    label: "Pickup Date",
  },
  {
    id: 3,
    inputId: "showSender",
    label: "Sender",
  },
  {
    id: 4,
    inputId: "showReceiver",
    label: "Receiver",
  },
  {
    id: 5,
    inputId: "showWeight",
    label: "Weight",
  }
];


const PickupRequestData = [
  {
    "pickup_type": "Regular",
    "pickup_date": "2025-01-24",
    "sender": "John Doe",
    "receiver": "Jane Smith",
    "weight": "10 kg"
  },
  {
    "pickup_type": "Express",
    "pickup_date": "2025-01-23",
    "sender": "ABC Logistics",
    "receiver": "XYZ Retailers",
    "weight": "15 kg"
  },
  {
    "pickup_type": "Scheduled",
    "pickup_date": "2025-01-22",
    "sender": "DEF Supplies",
    "receiver": "PQR Stores",
    "weight": "20 kg"
  },
  {
    "pickup_type": "Regular",
    "pickup_date": "2025-01-21",
    "sender": "GHI Enterprises",
    "receiver": "LMN Distributors",
    "weight": "25 kg"
  },
  {
    "pickup_type": "Express",
    "pickup_date": "2025-01-20",
    "sender": "JKL Industries",
    "receiver": "OPQ Traders",
    "weight": "30 kg"
  }
]


const ShipmentData = [
  {
    "id": "AVX0564686558",
    "date": "2025-01-22",
    "origin": "Mumbai",
    "supplier": "DEF Supplies",
    "destination": "PQR Stores",
    "order_type": "Full Truck",
    "trip_type": "Return"
  },
  {
    "id": "BZX9876543210",
    "date": "2025-02-10",
    "origin": "Delhi",
    "supplier": "ABC Logistics",
    "destination": "XYZ Retail",
    "order_type": "Partial Load",
    "trip_type": "One Way"
  },
  {
    "id": "CXT1234567890",
    "date": "2025-03-05",
    "origin": "Chennai",
    "supplier": "GHI Distributors",
    "destination": "LMN Supermarket",
    "order_type": "Full Truck",
    "trip_type": "Return"
  },
  {
    "id": "DVY6543210987",
    "date": "2025-01-30",
    "origin": "Hyderabad",
    "supplier": "JKL Wholesalers",
    "destination": "OPQ Mart",
    "order_type": "Partial Load",
    "trip_type": "One Way"
  },
  {
    "id": "EWR3216549870",
    "date": "2025-04-15",
    "origin": "Bangalore",
    "supplier": "MNO Suppliers",
    "destination": "RST Outlets",
    "order_type": "Full Truck",
    "trip_type": "Return"
  }
]



const runsheetData = [
  {
    "id": "SHIP12346",
    "delivery_location": "Chennai North",
    "pincode": "600001",
    "weight": "361 kg",
    "packages": 2,
    "delivery_status": "Pending Delivery"
  },
  {
    "id": "SHIP12347",
    "delivery_location": "Mumbai Central",
    "pincode": "400001",
    "weight": "500 kg",
    "packages": 4,
    "delivery_status": "Delivered"
  },
  {
    "id": "SHIP12348",
    "delivery_location": "Kolkata East",
    "pincode": "700001",
    "weight": "250 kg",
    "packages": 1,
    "delivery_status": "In Transit"
  },
  {
    "id": "SHIP12349",
    "delivery_location": "Delhi South",
    "pincode": "110001",
    "weight": "410 kg",
    "packages": 3,
    "delivery_status": "Out for Delivery"
  },
  {
    "id": "SHIP12350",
    "delivery_location": "Bangalore West",
    "pincode": "560001",
    "weight": "320 kg",
    "packages": 2,
    "delivery_status": "Pending Delivery"
  }
]



const mainfestData = [
  {
    "id": "SHIP12346",
    "destination": "Chennai",
    "weight": "111 kg",
    "packages": 18,
    "dimensions": "53x28x12 cm",
    "status": "Pending Assignment"
  },
  {
    "id": "SHIP12347",
    "destination": "Mumbai",
    "weight": "250 kg",
    "packages": 25,
    "dimensions": "60x30x15 cm",
    "status": "In Transit"
  },
  {
    "id": "SHIP12348",
    "destination": "Delhi",
    "weight": "320 kg",
    "packages": 12,
    "dimensions": "50x25x10 cm",
    "status": "Delivered"
  },
  {
    "id": "SHIP12349",
    "destination": "Hyderabad",
    "weight": "150 kg",
    "packages": 8,
    "dimensions": "45x22x14 cm",
    "status": "Out for Delivery"
  },
  {
    "id": "SHIP12350",
    "destination": "Bangalore",
    "weight": "200 kg",
    "packages": 20,
    "dimensions": "55x35x20 cm",
    "status": "Pending Assignment"
  }
]


const AllUserData = [
  {
    "name": "Alice Johnson",
    "userName": "alicej",
    "email": "alicej@example.com",
    "phone_number": "9876543210",
    "role": "Customer",
    "lastActive": "12/15/2023",
    "dateRegistered": "5/20/2022",
    "orders": 15,
    "totalSpent": 320.75,
    "city": "New York",
    "postalCode": 10001,
    "aov": 150.5
  },
  {
    "name": "Bob Smith",
    "userName": "bobsmith",
    "email": "bobsmith@example.com",
    "phone_number": "8765432109",
    "role": "Vendor",
    "business_name": "Smith Electronics",
    "registrationDate": "8/10/2021",
    "city": "Los Angeles",
    "postalCode": 90001
  },
  {
    "name": "Charlie Brown",
    "userName": "charlieb",
    "email": "charlieb@example.com",
    "phone_number": "7654321098",
    "role": "Driver",
    "driver_name": "Charlie Brown",
    "owner_name": "David Brown",
    "mission_type": "Courier",
    "vehicle_type": "Truck"
  },
  {
    "name": "David Warner",
    "userName": "dwarner",
    "email": "davidwarner@example.com",
    "phone_number": "6543210987",
    "role": "Customer",
    "lastActive": "11/25/2023",
    "dateRegistered": "6/5/2021",
    "orders": 20,
    "totalSpent": 540.25,
    "city": "Chicago",
    "postalCode": 60601,
    "aov": 220.0
  },
  {
    "name": "Emily Clark",
    "userName": "emilyc",
    "email": "emilyc@example.com",
    "phone_number": "5432109876",
    "role": "Vendor",
    "business_name": "Clark Retailers",
    "registrationDate": "9/15/2020",
    "city": "Houston",
    "postalCode": 77001
  },
  {
    "name": "Frank Miller",
    "userName": "frankm",
    "email": "frankm@example.com",
    "phone_number": "4321098765",
    "role": "Driver",
    "driver_name": "Frank Miller",
    "owner_name": "Sarah Miller",
    "mission_type": "Freight",
    "vehicle_type": "Van"
  },
  {
    "name": "Grace Lee",
    "userName": "gracelee",
    "email": "gracelee@example.com",
    "phone_number": "3210987654",
    "role": "Customer",
    "lastActive": "1/12/2024",
    "dateRegistered": "7/8/2022",
    "orders": 5,
    "totalSpent": 180.0,
    "city": "Phoenix",
    "postalCode": 85001,
    "aov": 100.0
  },
  {
    "name": "Henry Adams",
    "userName": "henrya",
    "email": "henrya@example.com",
    "phone_number": "2109876543",
    "role": "Vendor",
    "business_name": "Adams Supplies",
    "registrationDate": "3/20/2019",
    "city": "Philadelphia",
    "postalCode": 19101
  },
  {
    "name": "Irene Walters",
    "userName": "irenew",
    "email": "irenew@example.com",
    "phone_number": "1098765432",
    "role": "Driver",
    "driver_name": "Irene Walters",
    "owner_name": "Robert Walters",
    "mission_type": "Express",
    "vehicle_type": "Bike"
  },
  {
    "name": "Jack Daniels",
    "userName": "jackd",
    "email": "jackd@example.com",
    "phone_number": "0192837465",
    "role": "Customer",
    "lastActive": "2/5/2024",
    "dateRegistered": "12/10/2023",
    "orders": 2,
    "totalSpent": 60.5,
    "city": "San Diego",
    "postalCode": 92101,
    "aov": 80.0
  }
]

export {

  allDriverData,
  allDriverHeaderData,
  allVendorData,
  allVendorHeaderData,
  allAddressBookData,
  PickupRequestData,
  pickupRequestHeaderData,
  ShipmentData,
  runsheetData,
  mainfestData,

  AllUserData
};
