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
                <Route path='appointments/addappointment' element={<AddAppointment/>} />
                <Route path='appointments/addappointment/:id' element={<AddAppointment/>} />
                    {/* Department Routes */}
                    <Route path="mastersettings/departments" element={<DepartmentGrid />} />
                    <Route path="mastersettings/departments/add" element={<DepartmentForm />} />
                    <Route path="mastersettings/departments/edit/:id" element={<DepartmentForm />} />
                    <Route path="mastersettings/departments/view/:id" element={<DepartmentView />} />
                    {/* Add routes for other modules like users here */}
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
