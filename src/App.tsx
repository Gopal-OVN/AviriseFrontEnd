import { QueryClient, QueryClientProvider } from "react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ErrorLayout from "./components/layout/ErrorLayout";
import HomePageLayout from "./components/layout/HomePageLayout";
import InnerLayoutStyle1 from "./components/layout/InnerLayoutStyle1";
import InnerLayoutStyle2 from "./components/layout/InnerLayoutStyle2";
import InnerLayoutStyle3 from "./components/layout/InnerLayoutStyle3";
import AccountDeactivatedPage from "./pages/AccountDeactivatedPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import AddNewProductPage from "./pages/AddNewProductPage";
import AddressBookPage from "./pages/address-book/AddressBookPage";
import CreateAddressbook from "./pages/address-book/CreateAddressbook";
import EditAddressbook1 from "./pages/address-book/EditAddressbook1";
import AllCustomerPage from "./pages/AllCustomerPage";
import AllEmployeePage from "./pages/AllEmployeePage";
import AllProductPage from "./pages/AllProductPage";
import AnimationPage from "./pages/AnimationPage";
import AttendancePage from "./pages/AttendancePage";
import AudiencePage from "./pages/AudiencePage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import AddBranchPage from "./pages/branches/AddBranchPage";
import BranchPage from "./pages/branches/BranchPage";
import EditBranchPage from "./pages/branches/EditBranchPage";
import CalenderPage from "./pages/CalenderPage";
import CardDeclinedPage from "./pages/CardDeclinedPage";
import CategoryPage from "./pages/CategoryPage";
import ChartPage from "./pages/ChartPage";
import ChatPage from "./pages/ChatPage";
import CityPage from "./pages/City/CityPage";
import CreateCity from "./pages/City/CreateCity";
import EditCity from "./pages/City/EditCity";
import ComingSoonPage from "./pages/ComingSoonPage";
import ComingSoonPage2 from "./pages/ComingSoonPage2";
import AddCompanyPage from "./pages/companies/AddCompanyPage";
import CompanyIndexPage from "./pages/companies/CompanyIndexPage";
import EditCompanyPage from "./pages/companies/EditCompanyPage";
import CompanyPage from "./pages/CompanyPage";
import ContactPage from "./pages/ContactPage";
import CustomerPage from "./pages/CustomerPage";
import CreateCustomerPage from "./pages/customers/CreateCustomer";
import CustomerPage2 from "./pages/customers/CustomerPage";
import DeliveryPage from "./pages/DeliveryPage";
import CreateDriverPage from "./pages/drivers/CreateDriverPage";
import DriverPage from "./pages/drivers/driverPage";
import EmailPage from "./pages/EmailPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import Error400Page from "./pages/Error400Page";
import Error403Page from "./pages/Error403Page";
import Error404Page from "./pages/Error404Page";
import Error408Page from "./pages/Error408Page";
import Error500Page from "./pages/Error500Page";
import Error503Page from "./pages/Error503Page";
import Error504Page from "./pages/Error504Page";
import FileManagerPage from "./pages/FileManagerPage";
import FormPage from "./pages/FormPage";
import IconPage from "./pages/IconPage";
import IndexPage from "./pages/IndexPage";
import InvoicePage from "./pages/InvoicePage";
import LeadsPage from "./pages/LeadsPage";
import LoginPage from "./pages/LoginPage";
import LoginPage2 from "./pages/LoginPage2";
import LoginPage3 from "./pages/LoginPage3";
import LoginStatusPage from "./pages/LoginStatusPage";
import LogisticPage from "./pages/LogisticPage";
import ManifestPage from "./pages/manifest/ManifestPage";
import MapPage from "./pages/MapPage";
import MasterdataPage from "./pages/master-data/MasterdataPage";
import MultiStepAuthPage from "./pages/MultiStepAuthPage";
import NestableListPage from "./pages/NestableListPage";
// import CompletedOrderPage from "./pages/order/CompletedOrderPage";
import OrderPage from "./pages/order/OrderPage";
import OrderListPage from "./pages/OrderListPage";
import CreateParcelTypePage from "./pages/parcel-type/CreateParcelType";
import EditParcelTypeFormPage from "./pages/parcel-type/EditParcelType";
import ParcelTypePage from "./pages/parcel-type/ParcelTypePgae";
import CreatePaymentMode from "./pages/payment-mode/CreatePaymentMode";
import EditPaymentMode from "./pages/payment-mode/EditPaymentMode";
import PaymentModePage from "./pages/payment-mode/PaymentModePage";
import AllRequestPage from "./pages/pickup-request/AllRequestPage";
import CancelRequestPage from "./pages/pickup-request/CancelRequestPage";
import {
  default as CreatePickupPage,
  default as CreateRequestPage,
} from "./pages/pickup-request/CreatePickupPage";
import PendingRequestPage from "./pages/pickup-request/PendingRequestPage";
import PricingTablePage from "./pages/PricingTablePage";
import PricingTablePage2 from "./pages/PricingTablePage2";
import EditProfilePage from "./pages/profile/EditProfilePage";
import ViewProfilePage from "./pages/profile/ViewProfilePage";
import PromotionPage from "./pages/PromotionPage";
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationPage2 from "./pages/RegistrationPage2";
import ResetPasswordMailPage from "./pages/ResetPasswordMailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RunSheetPage from "./pages/runsheet/RunsheetPage";
import CreateServiceypePage from "./pages/service-type/CreateServiceType";
import EditServiceypePage from "./pages/service-type/EditServiceType";
import ServiceTypePage from "./pages/service-type/ServiceTypePage";
import CreateShipmentStatusForm from "./pages/shipment-status/CreateShipmentStatus";
import EditShipmentStatusForm from "./pages/shipment-status/EditShipmentStatus";
import ShipmentStatusPage from "./pages/shipment-status/ShipmentStatusPage";
import CreateState from "./pages/State/CreateState";
import EditState from "./pages/State/EditState";
import StatePage from "./pages/State/StatePage";
import SubscriptionConfirm from "./pages/SubscriptionConfirm";
import SweetAlertPage from "./pages/SweetAlertPage";
import SwiperSliderPage from "./pages/SwiperSliderPage";
import TablePage from "./pages/TablePage";
import TaskPage from "./pages/TaskPage";
import TwoFactorPage from "./pages/TwoFactorPage";
import UnderConstructionPage from "./pages/UnderConstructionPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AddNewUserPage from "./pages/users/AddNewUserPage";
import EditUserPage from "./pages/users/EditUserPage";
import UserPage from "./pages/users/UserPage";
import AllUsersPage from "./pages/Users2/AllUsersPage";
import UtilityPage from "./pages/UtilityPage";
import CreateVehicle from "./pages/vehicle/CreateVehicle";
import EditVehicle from "./pages/vehicle/EditVehicle";
import VehiclePage from "./pages/vehicle/VehiclePage";
import CreateVendorPage from "./pages/vendors/CreateVendorPage";
import VendorPage from "./pages/vendors/VendorPage";
import WelcomeMailPage from "./pages/WelcomeMailPage";
import WelcomePage from "./pages/WelcomePage";
import { useAppSelector } from "./redux/hooks";
// <<<<<<< HEAD
// import ServiceTypePage from "./pages/service-type/ServiceTypePage";
// import CreateServiceypePage from "./pages/service-type/CreateServiceType";
// import EditServiceypePage from "./pages/service-type/EditServiceType";
// import PaymentModePage from "./pages/payment-mode/PaymentModePage";
// import CreatePaymentMode from "./pages/payment-mode/CreatePaymentMode";
// import EditPaymentMode from "./pages/payment-mode/EditPaymentMode";
// import ParcelTypePage from "./pages/parcel-type/ParcelTypePgae";
// import CreateParcelTypePage from "./pages/parcel-type/CreateParcelType";
// import EditParcelTypeFormPage from "./pages/parcel-type/EditParcelType";
// import StatePage from "./pages/State/StatePage";
// import CreateState from "./pages/State/CreateState";
// import EditState from "./pages/State/EditState";
// import CityPage from "./pages/City/CityPage";
// import CreateCity from "./pages/City/CreateCity";
// import EditCity from "./pages/City/EditCity";
// import CreateAddressbook from "./pages/address-book/CreateAddressbook";
// import EditAddressbook1 from "./pages/address-book/EditAddressbook1";
// import VehiclePage from "./pages/vehicle/VehiclePage";
// import CreateVehicle from "./pages/vehicle/CreateVehicle";
// import EditVehicle from "./pages/vehicle/EditVehicle";

// import ShipmentStatusPage from "./pages/shipment-status/ShipmentStatusPage";
// import EditShipmentStatusForm from "./pages/shipment-status/EditShipmentStatus";
// import CreateShipmentStatusForm from "./pages/shipment-status/CreateShipmentStatus";
// =======
import EditCustomerPage from "./pages/customers/EditCustomer";
import EditDriverPage from "./pages/drivers/EditDriver";
import CreateOrderPage from "./pages/order/CreateOrderPage";
import PendingOrderPage from "./pages/order/PendingOrderPage";
import StateTabs from "./components/main/StateMain";
import OrderTabs from "./components/main/OrderTabs";
import EditOrderPage from "./pages/order/EditOrder";
import DeliveredOrderPage from "./pages/order/DeliveredOrder";
import IntrancitPage from "./pages/order/IntrancitOrder";
import OrderTrackingPage from "./pages/order-tracking/OrderTrackingPage";
import EditOrderTrackingForm from "./pages/order-tracking/EditOrderTracking";
import CreateOrderTrackingForm from "./pages/order-tracking/CreateOrderTracking";
import BulkOrderPage from "./pages/order/BulkOrderPage";
import RolePermissionPage from "./pages/role-permission/rolePermission";
import CreateRolePermissionPage from "./pages/role-permission/CreateRolePermission";
import EditRolePermissionPage from "./pages/role-permission/EditRolePermission";
import MenuPrivilegePage from "./pages/menu-privilege/MenuPrivilege";
import CreateMenuPrivilegePage from "./pages/menu-privilege/CreateMenuPrivilege";
import EditMenuPrivilegePage from "./pages/menu-privilege/EditMenuPrivilege";

// >>>>>>> 1a835c9a1d2710b17db17a3d1e95b028a170027f
const queryClient = new QueryClient();
const _auth = "/auth";
function App() {
  const activeLayout = useAppSelector((state) => state.layout.isLayout);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`${_auth}/login`} replace />}
          />
          <Route
            path="/auth/forget-password"
            element={<ForgetPasswordPage />}
          />
          <Route element={<HomePageLayout />}>
            <Route
              element={
                activeLayout === "style-1" ? (
                  <InnerLayoutStyle1 />
                ) : activeLayout === "style-2" ? (
                  <InnerLayoutStyle2 />
                ) : activeLayout === "style-3" ? (
                  <InnerLayoutStyle3 />
                ) : (
                  <></>
                )
              }
            >
              <Route path="/users" element={<UserPage />} />
              <Route path="/add-user" element={<AddNewUserPage />} />
              <Route path="/edit-user" element={<EditUserPage />} />
              <Route path="/create-customer" element={<CreateCustomerPage />} />
              <Route path="/customer" element={<CustomerPage2 />} />
              <Route path="/all-users" element={<AllUsersPage />} />
              <Route path="/service-type" element={<ServiceTypePage />} />
              <Route
                path="/create-service-type"
                element={<CreateServiceypePage />}
              />
              <Route
                path="/edit-service-type"
                element={<EditServiceypePage />}
              />
              <Route path="/payment-mode" element={<PaymentModePage />} />
              <Route path="/state" element={<StatePage />} />
              <Route path="/create-state" element={<CreateState />} />
              <Route path="/edit-state" element={<EditState />} />
              <Route path="/city" element={<CityPage />} />
              <Route path="/create-city" element={<CreateCity />} />

              <Route path="/edit-city" element={<EditCity />} />

              <Route
                path="/create-payment-mode"
                element={<CreatePaymentMode />}
              />
              <Route path="/edit-payment-mode" element={<EditPaymentMode />} />
              <Route path="/parcel-type" element={<ParcelTypePage />} />
              <Route
                path="/create-parcel-type"
                element={<CreateParcelTypePage />}
              />
              <Route
                path="/edit-parcel-type"
                element={<EditParcelTypeFormPage />}
              />
              <Route path="/vehicle" element={<VehiclePage />} />
              <Route path="create-vehicle" element={<CreateVehicle />} />
              <Route path="edit-vehicle" element={<EditVehicle />} />
              {/* <Route path="create-vehicle" element={<CreateVehicle />} />
              <Route path="edit-vehicle" element={<EditVehicle />} /> */}

              <Route path="/shipment-status" element={<ShipmentStatusPage />} />
              <Route
                path="/edit-shipment-status"
                element={<EditShipmentStatusForm />}
              />
              <Route
                path="/create-shipment-status"
                element={<CreateShipmentStatusForm />}
              />

              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route
                path="/edit-order-tracking"
                element={<EditOrderTrackingForm />}
              />
              <Route path="/create-order-tracking" element={<CreateOrderTrackingForm />} />


              <Route path="/role-permission" element={<RolePermissionPage />} />
              <Route path="/create-role-permission" element={<CreateRolePermissionPage />} />
              <Route path="/edit-role-permission" element={<EditRolePermissionPage />} />


              <Route path="/menu-privilege" element={<MenuPrivilegePage />} />
              <Route path="/create-menu-privilege" element={<CreateMenuPrivilegePage />} />
              <Route path="/edit-menu-privilege" element={<EditMenuPrivilegePage />} />


              <Route path="/states-tabs" element={<StateTabs />} />
              <Route path="/order-tabs" element={<OrderTabs />} />
              <Route path="/edit-order" element={<EditOrderPage />} />

              <Route path="/companies" element={<CompanyIndexPage />} />
              <Route path="/add-company" element={<AddCompanyPage />} />
              <Route path="/edit-company" element={<EditCompanyPage />} />
              <Route path="/branches" element={<BranchPage />} />
              <Route path="/add-branch" element={<AddBranchPage />} />
              <Route path="/edit-branch" element={<EditBranchPage />} />
              <Route path="/logistics" element={<IndexPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/dashboard" element={<LogisticPage />} />
              <Route path="/orders" element={<OrderPage />} />

              {/* <Route path="/completed-order" element={<CompletedOrderPage />} /> */}
              <Route path="/pending-order" element={<PendingOrderPage />} />
              <Route path="/create-order" element={<CreateOrderPage />} />
              <Route path="/intrancit" element={<IntrancitPage />} />
              <Route path="/delivered" element={<DeliveredOrderPage />} />

              <Route path="/all-request" element={<AllRequestPage />} />
              <Route path="/bulk-orders" element={<BulkOrderPage />} />

              <Route path="/pending-request" element={<PendingRequestPage />} />
              <Route path="/cancel-request" element={<CancelRequestPage />} />
              <Route path="/create-request" element={<CreateRequestPage />} />
              <Route path="/create-pickup" element={<CreatePickupPage />} />
              <Route path="/manifest" element={<ManifestPage />} />
              <Route path="/runsheet" element={<RunSheetPage />} />
              <Route path="/masterdata" element={<MasterdataPage />} />
              <Route path="/address-book" element={<AddressBookPage />} />
              <Route path="/create-address" element={<CreateAddressbook />} />
              <Route path="/edit-customer" element={<EditCustomerPage />} />

              <Route path="/edit-address" element={<EditAddressbook1 />} />
              <Route path="/edit-driver" element={<EditDriverPage />} />

              <Route path="/audience" element={<AudiencePage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/task" element={<TaskPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/add-employee" element={<AddEmployeePage />} />
              <Route path="/all-employee" element={<AllEmployeePage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/all-customer" element={<AllCustomerPage />} />
              <Route path="/drivers" element={<DriverPage />} />
              <Route path="/create-driver" element={<CreateDriverPage />} />
              <Route path="/vendors" element={<VendorPage />} />
              <Route path="/create-vendor" element={<CreateVendorPage />} />
              <Route path="/add-product" element={<AddNewProductPage />} />
              <Route path="/all-product" element={<AllProductPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/order" element={<OrderListPage />} />
              <Route path="/calendar" element={<CalenderPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/email" element={<EmailPage />} />
              <Route path="/invoices" element={<InvoicePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/view-profile" element={<ViewProfilePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/utility" element={<UtilityPage />} />
              <Route path="/sweet-alert" element={<SweetAlertPage />} />
              <Route path="/nestable-list" element={<NestableListPage />} />
              <Route path="/animation" element={<AnimationPage />} />
              <Route path="/swiper-slider" element={<SwiperSliderPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/charts" element={<ChartPage />} />
              <Route path="/icon" element={<IconPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/file-manager" element={<FileManagerPage />} />
            </Route>
          </Route>
          <Route path="/card-declined" element={<CardDeclinedPage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route
            path="/subscription-confirm"
            element={<SubscriptionConfirm />}
          />
          <Route path="/welcome-mail" element={<WelcomeMailPage />} />
          <Route
            path="/reset-password-mail"
            element={<ResetPasswordMailPage />}
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/login-2" element={<LoginPage2 />} />
          <Route path="/login-3" element={<LoginPage3 />} />
          <Route path="/login-status" element={<LoginStatusPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/registration-2" element={<RegistrationPage2 />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route
            path="/account-deactivated"
            element={<AccountDeactivatedPage />}
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/email-verify" element={<EmailVerifyPage />} />
          <Route path="/two-factor" element={<TwoFactorPage />} />
          <Route path="/multi-step-signup" element={<MultiStepAuthPage />} />
          <Route element={<ErrorLayout />}>
            <Route path="/error-400" element={<Error400Page />} />
            <Route path="/error-403" element={<Error403Page />} />
            <Route path="/error-404" element={<Error404Page />} />
            <Route path="/error-408" element={<Error408Page />} />
            <Route path="/error-500" element={<Error500Page />} />
            <Route path="/error-503" element={<Error503Page />} />
            <Route path="/error-504" element={<Error504Page />} />
          </Route>
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/coming-soon-2" element={<ComingSoonPage2 />} />
          <Route path="/pricing-table" element={<PricingTablePage />} />
          <Route path="/pricing-table-2" element={<PricingTablePage2 />} />
          <Route
            path="/under-construction"
            element={<UnderConstructionPage />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
