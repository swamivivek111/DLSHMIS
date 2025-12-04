import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { Container } from '@mantine/core'; 
import Random from '../Components/Random';
import AdminDashboard from '../Layout/AdminDashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PatientDashboard from '../Layout/PatientDashboard';
import PatientProfilePage from '../Pages/Patient/PatientProfilePage';
import DoctorDashboard from '../Layout/DoctorDashboard';
import DoctorProfilePage from '../Pages/Doctor/DoctorProfilePage';
import AdminProfilePage from '../Pages/Admin/AdminProfilePage';
import RegisterAdmin from '../Pages/RegisterAdmin';
import Dashboard from '../Components/Dashboard';
import ManageAppointment from '../Components/Appointment/ManageAppointment';
import AddAppointment from '../Components/Appointment/AddAppointment';
import DepartmentForm from '../Components/Masters/Department/DepartmentForm';
import DepartmentGrid from '../Components/Masters/Department/DepartmentGrid';
import DepartmentView from '../Components/Masters/Department/DepartmentView';
import DoctorGrid from '../Components/Masters/Docter/DocterGrid';
import DoctorForm from '../Components/Masters/Docter/DocterForm';
import DoctorView from '../Components/Masters/Docter/DocterView';
import CountryForm from '../Components/Masters/Country/CountryForm';
import CountryView from '../Components/Masters/Country/CountryView';
import CountryGrid from '../Components/Masters/Country/CountryGrid';
import StateGrid from '../Components/Masters/State/StateGrid';
import StateForm from '../Components/Masters/State/StateForm';
import StateView from '../Components/Masters/State/StateView';
import TalukaGrid from '../Components/Masters/Taluka/TalukaGrid';
import TalukaForm from '../Components/Masters/Taluka/TalukaForm';
import TalukaView from '../Components/Masters/Taluka/TalukaView';
import CityForm from '../Components/Masters/City/CityForm';
import CityGrid from '../Components/Masters/City/CityGrid';
import CityView from '../Components/Masters/City/CityView';
import TitleGrid from '../Components/Masters/Title/TitleGrid';
import TitleForm from '../Components/Masters/Title/TitleForm';
import TitleView from '../Components/Masters/Title/TitleView';
import BloodGroupGrid from '../Components/Masters/BloodGroup/BloodGroupGrid';
import BloodGroupForm from '../Components/Masters/BloodGroup/BloodGroupFrom';
import BloodGroupView from '../Components/Masters/BloodGroup/BloodGroupView';
import DesignationGrid from '../Components/Masters/Designation/DesignationGrid';
import DesignationForm from '../Components/Masters/Designation/DesignationForm';
import DesignationView from '../Components/Masters/Designation/DesignationView';
import WardGrid from '../Components/Masters/Ward/WardGrid';
import WardForm from '../Components/Masters/Ward/WardForm';
import WardView from '../Components/Masters/Ward/WardView';
import RoomGrid from '../Components/Masters/Room/RoomGrid';
import RoomForm from '../Components/Masters/Room/RoomForm';
import RoomView from '../Components/Masters/Room/RoomView';
import BedGrid from '../Components/Masters/Bed/BedGrid';
import BedForm from '../Components/Masters/Bed/BedForm';
import BedView from '../Components/Masters/Bed/BedView';
import DistrictGrid from '../Components/Masters/District/DistrictGrid';
import DistrictForm from '../Components/Masters/District/DistrictForm';
import DistrictView from '../Components/Masters/District/DistrictView';
import EmployeeGrid from '../Components/Masters/Employee/EmployeeGrid';
import EmployeeForm from '../Components/Masters/Employee/EmployeeForm';
import EmployeeView from '../Components/Masters/Employee/EmployeeView';

import BookAppointment from '../Components/Appointment/BookAppointment';
import AppointmentGrid from '../Components/Appointment/BookAppointment/AppointmentGrid';
import AppointmentForm from '../Components/Appointment/BookAppointment/AppointmentForm';
import AppointmentView from '../Components/Appointment/BookAppointment/AppointmentView';
import DoctorsScheduleView from '../Components/Appointment/DoctorsSchedule/DoctorsScheduleView';
import DoctorsScheduleForm from '../Components/Appointment/DoctorsSchedule/DoctorsScheduleForm';
import TokenValidator from '../Components/TokenValidator';
import RoleGrid from '../Components/ApplicationSettings/RoleManagement/RoleGrid';
import RoleForm from '../Components/ApplicationSettings/RoleManagement/RoleForm';
import UserGrid from '../Components/ApplicationSettings/UserManagement/UserGrid';
import UserForm from '../Components/ApplicationSettings/UserManagement/UserForm';
import ApplicationManagement from '../Components/ApplicationSettings/ApplicationManagement/ApplicationManagement';
import HospitalGrid from '../Components/Masters/Hospital/HospitalGrid';
import HospitalForm from '../Components/Masters/Hospital/HospitalForm';
import HospitalView from '../Components/Masters/Hospital/HospitalView';
import PatientRegistrationView from '../Components/Masters/Patient/PatientRegistrationView';
import PatientForm from '../Components/Masters/Patient/PatientForm';
import PatientView from '../Components/Masters/Patient/PatientView';
import LabOrderGrid from '../Components/Lab/Orders/LabOrderGrid';
import SampleCollectionGrid from '../Components/Lab/Collection/SampleCollectionGrid';
import LabResultsGrid from '../Components/Lab/Results/LabResultsGrid';
import LabReportsGrid from '../Components/Lab/Reports/LabReportsGrid';
import OPDVisitGrid from '../Components/OPD/OPDVisitGrid';
import OPDPatientRegistrationGrid from '../Components/OPD/OPDPatientRegistrationGrid';
import OPDPatientRegistration from '../Components/OPD/OPDPatientRegistration';
import OPDPatientView from '../Components/OPD/OPDPatientView';
import OPDPatientGrid from '../Components/OPD/OPDPatientGrid';
import OPDTest from '../Components/OPD/OPDTest';
import AdmissionGrid from '../Components/IPD/AdmissionGrid';
import RadiologyOrderGrid from '../Components/Radiology/RadiologyOrderGrid';
import AuditLogGrid from '../Components/Audit/AuditLogGrid';
import AuditLogView from '../Components/Audit/AuditLogView';
import NotificationCenter from '../Components/Notifications/NotificationCenter';
import AdvancedReports from '../Components/Reports/AdvancedReports';
import MobileConfig from '../Components/Mobile/MobileConfig';
import CategoryMaster from '../Components/Masters/CategoryMaster';
import TariffMaster from '../Components/Masters/TariffMasterSimple';
import TariffGrid from '../Components/Masters/Tariff/TariffGrid';
import TariffForm from '../Components/Masters/Tariff/TariffForm';
import TariffView from '../Components/Masters/Tariff/TariffView';
import CompanyMaster from '../Components/Masters/CompanyMaster';
import CompanyGrid from '../Components/Masters/Company/CompanyGrid';
import CompanyForm from '../Components/Masters/Company/CompanyForm';
import CompanyView from '../Components/Masters/Company/CompanyView';
import PatientCategoryGrid from '../Components/Masters/PatientCategory/PatientCategoryGrid';
import PatientCategoryForm from '../Components/Masters/PatientCategory/PatientCategoryForm';
import PatientCategoryView from '../Components/Masters/PatientCategory/PatientCategoryView';
import AuthorityGrid from '../Components/Masters/Authority/AuthorityGrid';
import AuthorityForm from '../Components/Masters/Authority/AuthorityForm';
import AuthorityView from '../Components/Masters/Authority/AuthorityView';
import CashCounterMaster from '../Components/Masters/CashCounterMaster';
import CashCounterGrid from '../Components/Masters/CashCounter/CashCounterGrid';
import CashCounterForm from '../Components/Masters/CashCounter/CashCounterForm';
import CashCounterView from '../Components/Masters/CashCounter/CashCounterView';
import ConsultationChargesGrid from '../Components/Masters/ConsultationCharges/ConsultationChargesGrid';
import ConsultationChargesForm from '../Components/Masters/ConsultationCharges/ConsultationChargesForm';
import ConsultationChargesView from '../Components/Masters/ConsultationCharges/ConsultationChargesView';
import SourceGrid from '../Components/Masters/Source/SourceGrid';
import SourceForm from '../Components/Masters/Source/SourceForm';
import SourceView from '../Components/Masters/Source/SourceView';
import ReferralNameGrid from '../Components/Masters/ReferralName/ReferralNameGrid';
import ReferralNameForm from '../Components/Masters/ReferralName/ReferralNameForm';
import ReferralNameView from '../Components/Masters/ReferralName/ReferralNameView';
import ReferralTypeGrid from '../Components/Masters/ReferralType/ReferralTypeGrid';
import ReferralTypeForm from '../Components/Masters/ReferralType/ReferralTypeForm';
import ReferralTypeView from '../Components/Masters/ReferralType/ReferralTypeView';
import ServiceTypeGrid from '../Components/Masters/ServiceType/ServiceTypeGrid';
import ServiceTypeForm from '../Components/Masters/ServiceType/ServiceTypeForm';
import ServiceTypeView from '../Components/Masters/ServiceType/ServiceTypeView';
import ServiceClassGrid from '../Components/Masters/ServiceClass/ServiceClassGrid';
import ServiceClassForm from '../Components/Masters/ServiceClass/ServiceClassForm';
import ServiceClassView from '../Components/Masters/ServiceClass/ServiceClassView';
import BillingHeadGrid from '../Components/Masters/BillingHead/BillingHeadGrid';
import BillingHeadForm from '../Components/Masters/BillingHead/BillingHeadForm';
import BillingHeadView from '../Components/Masters/BillingHead/BillingHeadView';
import WardGroupGrid from '../Components/Masters/WardGroup/WardGroupGrid';
import WardGroupForm from '../Components/Masters/WardGroup/WardGroupForm';
import WardGroupView from '../Components/Masters/WardGroup/WardGroupView';
import ServiceSubGroupGrid from '../Components/Masters/ServiceSubGroup/ServiceSubGroupGrid';
import ServiceSubGroupForm from '../Components/Masters/ServiceSubGroup/ServiceSubGroupForm';
import ServiceSubGroupView from '../Components/Masters/ServiceSubGroup/ServiceSubGroupView';
import ServiceGroupGrid from '../Components/Masters/ServiceGroup/ServiceGroupGrid';
import ServiceGroupForm from '../Components/Masters/ServiceGroup/ServiceGroupForm';
import ServiceGroupView from '../Components/Masters/ServiceGroup/ServiceGroupView';
import ServiceMasterGrid from '../Components/Masters/ServiceMaster/ServiceMasterGrid';
import ServiceMasterForm from '../Components/Masters/ServiceMaster/ServiceMasterForm';
import ServiceMasterView from '../Components/Masters/ServiceMaster/ServiceMasterView';
import TariffServiceMappingGrid from '../Components/Masters/TariffServiceMapping/TariffServiceMappingGrid';
import TariffServiceMappingForm from '../Components/Masters/TariffServiceMapping/TariffServiceMappingForm';
import TariffServiceMappingView from '../Components/Masters/TariffServiceMapping/TariffServiceMappingView';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <TokenValidator>
        <Routes>
            <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
            <Route path='/registeradmin' element={<PublicRoute><RegisterAdmin/></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
            <Route path='/' element={<Navigate to="/login" replace />} />

            <Route path='/admin' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
                <Route path='dashboard' element={<Dashboard/>} />
                <Route path='profile' element={<AdminProfilePage/>} />
                <Route path='doctors' element={<Random/>} />
                <Route path='patients' element={<Random/>} />
                <Route path='appointments' element={<ManageAppointment/>} />
                <Route path='pharmacy' element={<Random/>} />
                <Route path='mastersettings' element={<Random/>} />
                <Route path='appointments/list' element={<ManageAppointment/>} />
                <Route path='appointments/schedule' element={<DoctorsScheduleView/>} />
                <Route path='appointments/schedule/add' element={<DoctorsScheduleForm/>} />
                <Route path='appointments/schedule/edit/:id' element={<DoctorsScheduleForm/>} />
                <Route path='appointments/schedule/view/:id' element={<DoctorsScheduleView/>} />
                <Route path='appointments/addappointment' element={<AddAppointment/>} />
                <Route path='appointments/bookappointment' element={<AppointmentGrid/>} />
                <Route path='appointments/bookappointment/add' element={<AppointmentForm/>} />
                <Route path='appointments/bookappointment/edit/:id' element={<AppointmentForm/>} />
                <Route path='appointments/bookappointment/view/:id' element={<AppointmentView/>} />
                <Route path='appointments/addappointment/:id' element={<AddAppointment/>} />
                    {/* Hospital Routes */}
                    <Route path="mastersettings/hospitals" element={<HospitalGrid />} />
                    <Route path="mastersettings/hospitals/add" element={<HospitalForm />} />
                    <Route path="mastersettings/hospitals/edit/:id" element={<HospitalForm />} />
                    <Route path="mastersettings/hospitals/view/:id" element={<HospitalView />} />
                    
                    {/* Department Routes */}
                    <Route path="mastersettings/departments" element={<DepartmentGrid />} />
                    <Route path="mastersettings/departments/add" element={<DepartmentForm />} />
                    <Route path="mastersettings/departments/edit/:id" element={<DepartmentForm />} />
                    <Route path="mastersettings/departments/view/:id" element={<DepartmentView />} />
                    {/* Add routes for other modules like users here */}
                    <Route path="mastersettings/doctors" element={<DoctorGrid />} />
                    <Route path="mastersettings/doctors/add" element={<DoctorForm />} />
                    <Route path="mastersettings/doctors/edit/:id" element={<DoctorForm />} />
                    <Route path="mastersettings/doctors/view/:id" element={<DoctorView />} />


                    <Route path="mastersettings/countrys" element={<CountryGrid />} />
                    <Route path="mastersettings/countrys/add" element={<CountryForm />} />
                    <Route path="mastersettings/countrys/edit/:id" element={<CountryForm />} />
                    <Route path="mastersettings/countrys/view/:id" element={<CountryView />} />

                    <Route path="mastersettings/states" element={<StateGrid />} />
                    <Route path="mastersettings/states/add" element={<StateForm />} />
                    <Route path="mastersettings/states/edit/:id" element={<StateForm />} />
                    <Route path="mastersettings/states/view/:id" element={<StateView />} />
                    
                    <Route path="mastersettings/districts" element={<DistrictGrid />} />
                    <Route path="mastersettings/districts/add" element={<DistrictForm />} />
                    <Route path="mastersettings/districts/edit/:id" element={<DistrictForm />} />
                    <Route path="mastersettings/districts/view/:id" element={<DistrictView />} />
                    
                    <Route path="mastersettings/talukas" element={<TalukaGrid />} />
                    <Route path="mastersettings/talukas/add" element={<TalukaForm />} />
                    <Route path="mastersettings/talukas/edit/:id" element={<TalukaForm />} />
                    <Route path="mastersettings/talukas/view/:id" element={<TalukaView />} />
                    
                    <Route path="mastersettings/citys" element={<CityGrid />} />
                    <Route path="mastersettings/citys/add" element={<CityForm />} />
                    <Route path="mastersettings/citys/edit/:id" element={<CityForm />} />
                    <Route path="mastersettings/citys/view/:id" element={<CityView />} />

                    <Route path="mastersettings/titles" element={<TitleGrid />} />
                    <Route path="mastersettings/titles/add" element={<TitleForm />} />
                    <Route path="mastersettings/titles/edit/:id" element={<TitleForm />} />
                    <Route path="mastersettings/titles/view/:id" element={<TitleView />} />
                    
                    <Route path="mastersettings/bloodGroups" element={<BloodGroupGrid />} />
                    <Route path="mastersettings/bloodGroups/add" element={<BloodGroupForm />} />
                    <Route path="mastersettings/bloodGroups/edit/:id" element={<BloodGroupForm />} />
                    <Route path="mastersettings/bloodGroups/view/:id" element={<BloodGroupView />} />
                    
                    
                    <Route path="mastersettings/employees" element={<EmployeeGrid />} />
                    <Route path="mastersettings/employees/add" element={<EmployeeForm />} />
                    <Route path="mastersettings/employees/edit/:id" element={<EmployeeForm />} />
                    <Route path="mastersettings/employees/view/:id" element={<EmployeeView />} />



                    <Route path="mastersettings/designations" element={<DesignationGrid />} />
                    <Route path="mastersettings/designations/add" element={<DesignationForm />} />
                    <Route path="mastersettings/designations/edit/:id" element={<DesignationForm />} />
                    <Route path="mastersettings/designations/view/:id" element={<DesignationView />} />
                    
                    {/* Ward Routes */}
                    <Route path="mastersettings/wards" element={<WardGrid />} />
                    <Route path="mastersettings/wards/add" element={<WardForm />} />
                    <Route path="mastersettings/wards/edit/:id" element={<WardForm />} />
                    <Route path="mastersettings/wards/view/:id" element={<WardView />} />
                    
                    {/* Room Routes */}
                    <Route path="mastersettings/rooms" element={<RoomGrid />} />
                    <Route path="mastersettings/rooms/add" element={<RoomForm />} />
                    <Route path="mastersettings/rooms/edit/:id" element={<RoomForm />} />
                    <Route path="mastersettings/rooms/view/:id" element={<RoomView />} />
                    
                    {/* Bed Routes */}
                    <Route path="mastersettings/beds" element={<BedGrid />} />
                    <Route path="mastersettings/beds/add" element={<BedForm />} />
                    <Route path="mastersettings/beds/edit/:id" element={<BedForm />} />
                    <Route path="mastersettings/beds/view/:id" element={<BedView />} />
                    
                    {/* Application Settings Routes */}
                    <Route path="applicationsettings/roles" element={<RoleGrid />} />
                    <Route path="applicationsettings/roles/add" element={<RoleForm />} />
                    <Route path="applicationsettings/roles/edit/:id" element={<RoleForm />} />
                    <Route path="applicationsettings/users" element={<UserGrid />} />
                    <Route path="applicationsettings/users/add" element={<UserForm />} />
                    <Route path="applicationsettings/users/edit/:id" element={<UserForm />} />
                    <Route path="applicationsettings/application" element={<ApplicationManagement />} />
                    
                    {/* Patient Registration Routes */}
                    <Route path="dashboard/registration" element={<PatientRegistrationView />} />
                    <Route path="dashboard/registration/add" element={<PatientForm />} />
                    <Route path="dashboard/registration/edit/:id" element={<PatientForm />} />
                    <Route path="dashboard/registration/view/:id" element={<PatientView />} />
                    
                    {/* Lab Management Routes */}
                    <Route path="lab/orders" element={<LabOrderGrid />} />
                    <Route path="lab/collection" element={<SampleCollectionGrid />} />
                    <Route path="lab/results" element={<LabResultsGrid />} />
                    <Route path="lab/reports" element={<LabReportsGrid />} />
                    
                    {/* OPD Management Routes */}
                    <Route path="opd/test" element={<OPDTest />} />
                    <Route path="opd/registration" element={<OPDPatientRegistrationGrid />} />
                    <Route path="opd/registration/add" element={<OPDPatientRegistration />} />
                    <Route path="opd/registration/edit/:id" element={<OPDPatientRegistration />} />
                    <Route path="opd/registration/view/:id" element={<OPDPatientView />} />
                    <Route path="opd/visits" element={<OPDVisitGrid />} />
                    <Route path="opd/queue" element={<Random />} />
                    <Route path="opd/vitals" element={<Random />} />
                    <Route path="opd/billing" element={<Random />} />
                    <Route path="opd/advance" element={<Random />} />
                    <Route path="opd/refund" element={<Random />} />
                    <Route path="opd/cancellation" element={<Random />} />
                    <Route path="opd/settlement" element={<Random />} />
                    <Route path="opd/reports" element={<Random />} />
                    <Route path="opd/reports/daily" element={<Random />} />
                    <Route path="opd/reports/visits" element={<Random />} />
                    <Route path="opd/reports/revenue" element={<Random />} />
                    
                    {/* IPD Management Routes */}
                    <Route path="ipd/admissions" element={<AdmissionGrid />} />
                    
                    {/* Radiology Management Routes */}
                    <Route path="radiology/orders" element={<RadiologyOrderGrid />} />
                    
                    {/* Audit Management Routes */}
                    <Route path="audit" element={<Navigate to="/admin/audit/logs" replace />} />
                    <Route path="audit/logs" element={<AuditLogGrid />} />
                    <Route path="audit/logs/view/:id" element={<AuditLogView />} />
                    
                    {/* Category and Tariff Master Routes */}
                    <Route path="mastersettings/categories" element={<CategoryMaster />} />
                    <Route path="mastersettings/tariffs" element={<TariffGrid />} />
                    <Route path="mastersettings/tariffs/add" element={<TariffForm />} />
                    <Route path="mastersettings/tariffs/edit/:id" element={<TariffForm />} />
                    <Route path="mastersettings/tariffs/view/:id" element={<TariffView />} />
                    <Route path="mastersettings/companies" element={<CompanyGrid />} />
                    <Route path="mastersettings/companies/add" element={<CompanyForm />} />
                    <Route path="mastersettings/companies/edit/:id" element={<CompanyForm />} />
                    <Route path="mastersettings/companies/view/:id" element={<CompanyView />} />
                    
                    {/* Patient Category Routes */}
                    <Route path="mastersettings/patient-categories" element={<PatientCategoryGrid />} />
                    <Route path="mastersettings/patient-categories/add" element={<PatientCategoryForm />} />
                    <Route path="mastersettings/patient-categories/edit/:id" element={<PatientCategoryForm />} />
                    <Route path="mastersettings/patient-categories/view/:id" element={<PatientCategoryView />} />
                    
                    {/* Authority Routes */}
                    <Route path="mastersettings/authorities" element={<AuthorityGrid />} />
                    <Route path="mastersettings/authorities/add" element={<AuthorityForm />} />
                    <Route path="mastersettings/authorities/edit/:id" element={<AuthorityForm />} />
                    <Route path="mastersettings/authorities/view/:id" element={<AuthorityView />} />
                    
                    {/* Cash Counter Routes */}
                    <Route path="mastersettings/cash-counters" element={<CashCounterGrid />} />
                    <Route path="mastersettings/cash-counters/add" element={<CashCounterForm />} />
                    <Route path="mastersettings/cash-counters/edit/:id" element={<CashCounterForm />} />
                    <Route path="mastersettings/cash-counters/view/:id" element={<CashCounterView />} />
                    
                    {/* Consultation Charges Routes */}
                    <Route path="mastersettings/consultation-charges" element={<ConsultationChargesGrid />} />
                    <Route path="mastersettings/consultation-charges/add" element={<ConsultationChargesForm />} />
                    <Route path="mastersettings/consultation-charges/edit/:id" element={<ConsultationChargesForm />} />
                    <Route path="mastersettings/consultation-charges/view/:id" element={<ConsultationChargesView />} />
                    
                    {/* Source Routes */}
                    <Route path="mastersettings/sources" element={<SourceGrid />} />
                    <Route path="mastersettings/sources/add" element={<SourceForm />} />
                    <Route path="mastersettings/sources/edit/:id" element={<SourceForm />} />
                    <Route path="mastersettings/sources/view/:id" element={<SourceView />} />
                    
                    {/* Referral Name Routes */}
                    <Route path="mastersettings/referral-names" element={<ReferralNameGrid />} />
                    <Route path="mastersettings/referral-names/add" element={<ReferralNameForm />} />
                    <Route path="mastersettings/referral-names/edit/:id" element={<ReferralNameForm />} />
                    <Route path="mastersettings/referral-names/view/:id" element={<ReferralNameView />} />
                    
                    {/* Referral Type Routes */}
                    <Route path="mastersettings/referral-types" element={<ReferralTypeGrid />} />
                    <Route path="mastersettings/referral-types/add" element={<ReferralTypeForm />} />
                    <Route path="mastersettings/referral-types/edit/:id" element={<ReferralTypeForm />} />
                    <Route path="mastersettings/referral-types/view/:id" element={<ReferralTypeView />} />
                    
                    {/* Service Class Routes */}
                    <Route path="mastersettings/service-classes" element={<ServiceClassGrid />} />
                    <Route path="mastersettings/service-classes/add" element={<ServiceClassForm />} />
                    <Route path="mastersettings/service-classes/edit/:id" element={<ServiceClassForm />} />
                    <Route path="mastersettings/service-classes/view/:id" element={<ServiceClassView />} />
                    
                    {/* Service Type Routes */}
                    <Route path="mastersettings/service-types" element={<ServiceTypeGrid />} />
                    <Route path="mastersettings/service-types/add" element={<ServiceTypeForm />} />
                    <Route path="mastersettings/service-types/edit/:id" element={<ServiceTypeForm />} />
                    <Route path="mastersettings/service-types/view/:id" element={<ServiceTypeView />} />
                    
                    {/* Billing Head Routes */}
                    <Route path="mastersettings/billing-heads" element={<BillingHeadGrid />} />
                    <Route path="mastersettings/billing-heads/add" element={<BillingHeadForm />} />
                    <Route path="mastersettings/billing-heads/edit/:id" element={<BillingHeadForm />} />
                    <Route path="mastersettings/billing-heads/view/:id" element={<BillingHeadView />} />
                    
                    {/* Ward Group Routes */}
                    <Route path="mastersettings/ward-groups" element={<WardGroupGrid />} />
                    <Route path="mastersettings/ward-groups/add" element={<WardGroupForm />} />
                    <Route path="mastersettings/ward-groups/edit/:id" element={<WardGroupForm />} />
                    <Route path="mastersettings/ward-groups/view/:id" element={<WardGroupView />} />
                    
                    {/* Service Group Routes */}
                    <Route path="mastersettings/service-groups" element={<ServiceGroupGrid />} />
                    <Route path="mastersettings/service-groups/add" element={<ServiceGroupForm />} />
                    <Route path="mastersettings/service-groups/edit/:id" element={<ServiceGroupForm />} />
                    <Route path="mastersettings/service-groups/view/:id" element={<ServiceGroupView />} />
                    
                    {/* Service Sub Group Routes */}
                    <Route path="mastersettings/service-sub-groups" element={<ServiceSubGroupGrid />} />
                    <Route path="mastersettings/service-sub-groups/add" element={<ServiceSubGroupForm />} />
                    <Route path="mastersettings/service-sub-groups/edit/:id" element={<ServiceSubGroupForm />} />
                    <Route path="mastersettings/service-sub-groups/view/:id" element={<ServiceSubGroupView />} />
                    
                    {/* Service Master Routes */}
                    <Route path="mastersettings/services" element={<ServiceMasterGrid />} />
                    <Route path="mastersettings/services/add" element={<ServiceMasterForm />} />
                    <Route path="mastersettings/services/edit/:id" element={<ServiceMasterForm />} />
                    <Route path="mastersettings/services/view/:id" element={<ServiceMasterView />} />
                    
                    {/* Tariff Service Mapping Routes */}
                    <Route path="mastersettings/tariff-service-mappings" element={<TariffServiceMappingGrid />} />
                    <Route path="mastersettings/tariff-service-mappings/add" element={<TariffServiceMappingForm />} />
                    <Route path="mastersettings/tariff-service-mappings/edit/:id" element={<TariffServiceMappingForm />} />
                    <Route path="mastersettings/tariff-service-mappings/view/:id" element={<TariffServiceMappingView />} />
                    
                    {/* Advanced Features Routes */}
                    <Route path="notifications" element={<NotificationCenter />} />
                    <Route path="reports" element={<AdvancedReports />} />
                    <Route path="mobile" element={<MobileConfig />} />

            </Route>
            
            <Route path='/doctor' element={<ProtectedRoute><DoctorDashboard/></ProtectedRoute>}>
                <Route path='dashboard' element={<Random/>} />
                <Route path='profile' element={<DoctorProfilePage/>} />
                <Route path='doctors' element={<Random/>} />
                <Route path='patients' element={<Random/>} />
                <Route path='appointments' element={<Random/>} />
                <Route path='pharmacy' element={<Random/>} />
                <Route path='mastersettings' element={<Random/>} />
            </Route>
            <Route path='/patient' element={<ProtectedRoute><PatientDashboard/></ProtectedRoute>}>
                <Route path='dashboard' element={<Random/>} />
                <Route path='profile' element={<PatientProfilePage/>} />
                <Route path='patients' element={<Random/>} />
                <Route path='appointments' element={<Random/>} />
            </Route>
        </Routes>
      </TokenValidator>
    </BrowserRouter>
  )
}

export default AppRoutes
