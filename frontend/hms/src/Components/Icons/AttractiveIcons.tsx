import React from 'react';
import {
  // Dashboard & Navigation
  IconLayoutDashboard,
  IconChartPie3,
  IconHome2,
  
  // Appointments & Scheduling
  IconCalendarEvent,
  IconCalendarCheck,
  IconClockHour4,
  IconCalendarTime,
  
  // Medical Modules
  IconFlask,
  IconTestPipe2,
  IconScan,
  IconX,
  IconBottle,
  IconCapsule,
  IconHeartRateMonitor,
  IconStethoscopeOff,
  
  // Patient Care
  IconUserHeart,
  IconBedFlat,
  IconNurse,
  IconMedicalCross,
  IconHeartHandshake,
  
  // Operations
  IconBuildingHospital,
  IconAmbulance,
  IconFirstAidKit,
  IconSurgery,
  
  // Management
  IconUsers,
  IconUserCheck,
  IconSettings2,
  IconShieldCheck,
  IconReportAnalytics,
  
  // Modern Alternatives
  IconActivity,
  IconPulse,
  IconDna2,
  IconVaccine,
  IconThermometer
} from '@tabler/icons-react';

// Medical Color Palette
export const medicalColors = {
  primary: "text-blue-600",      // Main actions
  secondary: "text-cyan-500",    // Lab/diagnostics  
  success: "text-green-500",     // Positive actions
  warning: "text-amber-500",     // Alerts
  danger: "text-red-500",        // Critical
  info: "text-indigo-500",       // Information
  purple: "text-purple-500",     // Radiology
  teal: "text-teal-500",         // Pharmacy
  neutral: "text-gray-500"       // Settings
};

// Attractive Icon Showcase
export const AttractiveIconShowcase = () => {
  const iconSections = [
    {
      title: "Dashboard & Navigation",
      icons: [
        { name: "Layout Dashboard", icon: <IconLayoutDashboard stroke={2} className={medicalColors.primary}/>, description: "Modern dashboard" },
        { name: "Chart Pie", icon: <IconChartPie3 stroke={2} className={medicalColors.purple}/>, description: "Analytics focused" },
        { name: "Home 2", icon: <IconHome2 stroke={2} className={medicalColors.success}/>, description: "Friendly home" }
      ]
    },
    {
      title: "Appointments & Scheduling", 
      icons: [
        { name: "Calendar Event", icon: <IconCalendarEvent stroke={2} className={medicalColors.info}/>, description: "Event focused" },
        { name: "Calendar Check", icon: <IconCalendarCheck stroke={2} className={medicalColors.success}/>, description: "Confirmation feel" },
        { name: "Clock Hour", icon: <IconClockHour4 stroke={2} className={medicalColors.warning}/>, description: "Time focused" }
      ]
    },
    {
      title: "Medical Modules",
      icons: [
        { name: "Flask", icon: <IconFlask stroke={2} className={medicalColors.secondary}/>, description: "Modern lab" },
        { name: "Test Pipe 2", icon: <IconTestPipe2 stroke={2} className={medicalColors.secondary}/>, description: "Lab testing" },
        { name: "Scan", icon: <IconScan stroke={2} className={medicalColors.purple}/>, description: "Radiology" },
        { name: "Bottle", icon: <IconBottle stroke={2} className={medicalColors.teal}/>, description: "Pharmacy" },
        { name: "Capsule", icon: <IconCapsule stroke={2} className={medicalColors.teal}/>, description: "Medicine" }
      ]
    },
    {
      title: "Patient Care",
      icons: [
        { name: "User Heart", icon: <IconUserHeart stroke={2} className={medicalColors.danger}/>, description: "Patient care" },
        { name: "Heart Rate Monitor", icon: <IconHeartRateMonitor stroke={2} className={medicalColors.danger}/>, description: "Vitals" },
        { name: "Bed Flat", icon: <IconBedFlat stroke={2} className={medicalColors.info}/>, description: "IPD" },
        { name: "Heart Handshake", icon: <IconHeartHandshake stroke={2} className={medicalColors.success}/>, description: "Care" }
      ]
    },
    {
      title: "Operations",
      icons: [
        { name: "Building Hospital", icon: <IconBuildingHospital stroke={2} className={medicalColors.primary}/>, description: "Hospital" },
        { name: "Ambulance", icon: <IconAmbulance stroke={2} className={medicalColors.danger}/>, description: "Emergency" },
        { name: "First Aid Kit", icon: <IconFirstAidKit stroke={2} className={medicalColors.warning}/>, description: "Emergency care" },
        { name: "Surgery", icon: <IconSurgery stroke={2} className={medicalColors.purple}/>, description: "OT" }
      ]
    },
    {
      title: "Management & Settings",
      icons: [
        { name: "Users", icon: <IconUsers stroke={2} className={medicalColors.info}/>, description: "User management" },
        { name: "Shield Check", icon: <IconShieldCheck stroke={2} className={medicalColors.success}/>, description: "Security" },
        { name: "Settings 2", icon: <IconSettings2 stroke={2} className={medicalColors.neutral}/>, description: "Modern settings" },
        { name: "Report Analytics", icon: <IconReportAnalytics stroke={2} className={medicalColors.purple}/>, description: "Reports" }
      ]
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🎨 Attractive Icons for Hospital Management System
        </h1>
        
        {iconSections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.icons.map((item, iconIndex) => (
                <div key={iconIndex} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Color Palette */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Medical Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(medicalColors).map(([name, className]) => (
              <div key={name} className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${className.replace('text-', 'bg-')}`}></div>
                <p className="text-sm font-medium capitalize">{name}</p>
                <p className="text-xs text-gray-500">{className}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractiveIconShowcase;