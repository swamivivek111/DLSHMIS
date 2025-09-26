import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'; 
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
import DistrictGrid from '../Components/Masters/District/DistrictGrid';
import DistrictForm from '../Components/Masters/District/DistrictForm';
import DistrictView from '../Components/Masters/District/DistrictView';
import EmployeeGrid from '../Components/Masters/Employee/EmployeeGrid';
import EmployeeForm from '../Components/Masters/Employee/EmployeeForm';
import EmployeeView from '../Components/Masters/Employee/EmployeeView';
import UserProfileRoleGrid from '../Components/Masters/UserProfileRole/UserProfileRoleGrid';
import UserProfileRoleForm from '../Components/Masters/UserProfileRole/UserProfileRoleForm';
import UserProfileRoleView from '../Components/Masters/UserProfileRole/UserProfileRoleView';
import BookAppointment from '../Components/Appointment/BookAppointment';
import DoctorScheduleManager from '../Components/Appointment/DoctorScheduleManager';


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
            <Route path='/registeradmin' element={<PublicRoute><RegisterAdmin/></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
            <Route path='/' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/profile' element={<AdminProfilePage/>} />
                <Route path='/doctors' element={<Random/>} />
                <Route path='/patients' element={<Random/>} />
                <Route path='/bookappointment' element={<AdminProfilePage/>} />
                <Route path='/pharmacy' element={<Random/>} />
                <Route path='/mastersettings' element={<Random/>} />
            </Route>
            <Route path='/admin' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
                <Route path='dashboard' element={<Dashboard/>} />
                <Route path='profile' element={<AdminProfilePage/>} />
                <Route path='doctors' element={<Random/>} />
                <Route path='patients' element={<Random/>} />
                <Route path='appointments' element={<ManageAppointment/>} />
                <Route path='pharmacy' element={<Random/>} />
                <Route path='mastersettings' element={<Random/>} />
                <Route path='appointments/list' element={<ManageAppointment/>} />
                <Route path='appointments/schedule' element={<DoctorScheduleManager/>} />
                <Route path='appointments/addappointment' element={<AddAppointment/>} />
                <Route path='appointments/bookappointment' element={<BookAppointment/>} />
                <Route path='appointments/addappointment/:id' element={<AddAppointment/>} />
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

                    <Route path="mastersettings/userProfileRoles" element={<UserProfileRoleGrid />} />
                    <Route path="mastersettings/userProfileRoles/add" element={<UserProfileRoleForm />} />
                    <Route path="mastersettings/userProfileRoles/edit/:id" element={<UserProfileRoleForm />} />
                    <Route path="mastersettings/userProfileRoles/view/:id" element={<UserProfileRoleView />} />

                    <Route path="mastersettings/designations" element={<DesignationGrid />} />
                    <Route path="mastersettings/designations/add" element={<DesignationForm />} />
                    <Route path="mastersettings/designations/edit/:id" element={<DesignationForm />} />
                    <Route path="mastersettings/designations/view/:id" element={<DesignationView />} />
                    

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
    </BrowserRouter>
  )
}

export default AppRoutes
