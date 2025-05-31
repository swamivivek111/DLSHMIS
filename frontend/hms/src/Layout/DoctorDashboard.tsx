import Header from '../Components/Header/Header'
import { Outlet} from 'react-router-dom'
import Sidebar from '../Components/Doctor/Sidebar/Sidebar'

function DoctorDashboard() {
    return (
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header sidebarOpen={false} handleSidebarToggle={function (): void {
            throw new Error('Function not implemented.')
          } } onMenuClick={function (): void {
            throw new Error('Function not implemented.')
          } } />
            <main className="flex-1 p-4">
              <Outlet />
            </main>
          </div>
        </div>
      )
}

export default DoctorDashboard
