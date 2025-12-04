import { useState } from 'react';
import Sidebar from '../Components/Admin/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);//Setting default open when first time it loads

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
 
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />
      
      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16' // Show collapsed sidebar (64px) when closed
        }`}
      >
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
        
        {/* Main content area */}
        <main className="flex-1 p-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
