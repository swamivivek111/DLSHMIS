import { Avatar, Drawer, Text, NavLink as MantineNavLink, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { 
  // Modern Dashboard Icons
  IconLayoutDashboard, IconChartPie3,
  
  // Appointment Icons
  IconCalendarEvent, IconCalendarCheck, IconClockHour4,
  
  // Medical Module Icons
  IconFlask, IconScan, IconBottle, IconCapsule,
  IconHeartRateMonitor, IconUserHeart, IconBedFlat,
  IconAmbulance, IconSurgery, IconFirstAidKit,
  
  // Management Icons
  IconUsers, IconUserCheck, IconSettings2, IconShieldCheck,
  IconReportAnalytics, IconBuildingHospital,
  
  // Utility Icons
  IconHeartHandshake, IconActivity, IconPulse,
  IconTestPipe2, IconMedicalCross, IconNurse,
  
  // Navigation Icons
  IconChevronRight, IconHome2,
  
  // Legacy icons for compatibility
  IconBook, IconTransitionRightFilled, IconSquareRoundedPlus,
  IconFileInvoiceFilled, IconReceiptRefund, IconSquareX,
  IconReceiptRupee, IconCoinRupee, IconReport, IconHeartbeat,
  IconNotes, IconProgress, IconTruckReturn, IconClipboardList,
  IconReportMedical, IconFileText, IconCalendarTime, IconPhoto,
  IconDeviceDesktop, IconBed, IconClipboardData, IconTool,
  IconPackages, IconPrescription, IconBoxSeam, IconUser,
  IconStethoscope, IconBriefcase, IconUserFilled, IconHomeFilled,
  IconDoor, IconWorld, IconFlag, IconMapPinFilled, IconDropletFilled,
  IconAwardFilled, IconIdBadge2, IconBadgeFilled, IconUserShield
} from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, NavLink as RouterNavLink } from 'react-router-dom';

// Medical Color Palette
const medicalColors = {
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

interface SidebarLink {
  name: string;
  url: string;
  icon?: ReactNode;
  children?: SidebarLink[];
  childrens?: SidebarLink[];
}

const SidebarLinkItem = ({ link, openedItem, setOpenedItem, collapsed, handleSidebarToggle }: { 
  link: SidebarLink; 
  openedItem: string | null; 
  setOpenedItem: (item: string | null) => void; 
  collapsed?: boolean; 
  handleSidebarToggle?: () => void 
}) => {
  const location = useLocation();

  const isActive = location.pathname === link.url;
  const allChildren = link.children || link.childrens;
  const isChildActive = allChildren?.some((child) =>
    location.pathname.startsWith(child.url)
  );

  const baseClass = "flex items-center w-full h-11 font-medium rounded-lg transition-all duration-200";
  const activeParentClass = "bg-white text-gray-800 shadow-sm";
  const activeChildClass = "bg-white text-gray-800 shadow-sm";
  const defaultClass = "text-white hover:bg-white/10 hover:text-white";

  const linkClass = isActive
    ? `${baseClass} ${activeParentClass}`
    : isChildActive
    ? `${baseClass} ${activeChildClass}`
    : `${baseClass} ${defaultClass}`;

  const isOpened = openedItem === link.name || ((isActive || isChildActive) && link.name !== 'Application Settings' && link.name !== 'Master Settings');

  if (collapsed) {
    return (
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 cursor-pointer mx-1 mb-2 ${
          isActive || isChildActive ? 'bg-white text-gray-800 shadow-sm' : 'text-white hover:bg-white/10'
        }`}
        onClick={() => {
          if (handleSidebarToggle) {
            handleSidebarToggle();
          }
        }}
        title={link.name}
      >
        {link.icon}
      </div>
    );
  }

  return (
    <MantineNavLink
      label={link.name}
      component={RouterNavLink}
      to={link.url}
      leftSection={link.icon}
      active={isActive}
      opened={isOpened}
      onChange={() => {
        if (allChildren?.length) {
          setOpenedItem(isOpened ? null : link.name);
        }
      }}
      className={linkClass}
      childrenOffset={16}
      styles={{
        label: {
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'auto',
          flex: '1 1 auto'
        }
      }}
    >
      {allChildren?.map((child) => (
        <SidebarLinkItem key={child.url} link={child} openedItem={openedItem} setOpenedItem={setOpenedItem} collapsed={collapsed} />
      ))}
    </MantineNavLink>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const ImprovedSidebar = ({
  isOpen,
  onClose,
  sidebarOpen,
  handleSidebarToggle,
}: SidebarProps) => {
  const user = useSelector((state: any) => state.user);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [openedItem, setOpenedItem] = useState<string | null>(null);

  const links: SidebarLink[] = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <IconLayoutDashboard stroke={2} className={medicalColors.primary}/>,
    },
    {
      name: "Appointments",
      url: "",
      icon: <IconCalendarEvent stroke={2} className={medicalColors.info}/>,
      childrens: [
        {
          name: "Doctor Schedule",
          url: "/admin/appointments/schedule",
          icon: <IconCalendarTime stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Book Appointment",
          url: "/admin/appointments/bookappointment",
          icon: <IconCalendarCheck stroke={2} className={medicalColors.success}/>,
        },
      ],
    },
    {
      name: "OPD",
      url: "",
      icon: <IconUserHeart stroke={2} className={medicalColors.success}/>,
      childrens: [
        {
          name: "Patient Registration",
          url: "/admin/dashboard/registration",
          icon: <IconUserCheck stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Patient Visit",
          url: "/admin/dashboard/visit",
          icon: <IconActivity stroke={2} className={medicalColors.primary}/>,
        },
        {
          name: "OP Billing",
          url: "/admin/dashboard/billing",
          icon: <IconFileInvoiceFilled stroke={2} className={medicalColors.warning}/>,
        },
        {
          name: "Refund",
          url: "/admin/dashboard/refund",
          icon: <IconReceiptRefund stroke={2} className={medicalColors.danger}/>,
        },
        {
          name: "Bill Cancellation",
          url: "/admin/dashboard/cancellation",
          icon: <IconSquareX stroke={2} className={medicalColors.danger}/>,
        },
        {
          name: "Advance",
          url: "/admin/dashboard/advance",
          icon: <IconReceiptRupee stroke={2} className={medicalColors.warning}/>,
        },
        {
          name: "Due Settlement",
          url: "/admin/dashboard/settlement",
          icon: <IconCoinRupee stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Queue Management",
          url: "/admin/dashboard/queue",
          icon: <IconClockHour4 stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Vitals",
          url: "/admin/dashboard/vitals",
          icon: <IconHeartRateMonitor stroke={2} className={medicalColors.danger}/>,
        },
        {
          name: "Reports",
          url: "/admin/dashboard/report",
          icon: <IconReportAnalytics stroke={2} className={medicalColors.purple}/>,
          children: [
            {
              name: "Daily Records",
              url: "/admin/dashboard/report/daily",
              icon: <IconReport stroke={2} className={medicalColors.purple}/>,
            },
          ],
        },
      ],
    },
    {
      name: "IPD",
      url: "",
      icon: <IconBedFlat stroke={2} className={medicalColors.info}/>,
      childrens: [
        {
          name: "Nursing",
          url: "/admin/ipd/nursing",
          icon: <IconNurse stroke={2} className={medicalColors.success}/>,
          children: [
            {
              name: "Vitals",
              url: "/admin/ipd/nursing/vitals",
              icon: <IconPulse stroke={2} className={medicalColors.danger}/>,
            },
            {
              name: "Progress Notes",
              url: "/admin/ipd/nursing/notes",
              icon: <IconNotes stroke={2} className={medicalColors.info}/>,
            },
            {
              name: "Indent",
              url: "/admin/ipd/nursing/indent",
              icon: <IconProgress stroke={2} className={medicalColors.warning}/>,
            },
            {
              name: "Intake Output",
              url: "/admin/ipd/nursing/intake",
              icon: <IconActivity stroke={2} className={medicalColors.primary}/>,
            },
            {
              name: "Drug Return",
              url: "/admin/ipd/nursing/return",
              icon: <IconTruckReturn stroke={2} className={medicalColors.warning}/>,
            },
            {
              name: "Discharge Summary",
              url: "/admin/ipd/nursing/discharge",
              icon: <IconReport stroke={2} className={medicalColors.success}/>,
            },
          ]
        },
        {
          name: "Admission",
          url: "/admin/ipd/admission",
          icon: <IconBed stroke={2} className={medicalColors.primary}/>,
        },
        {
          name: "IP Billing",
          url: "/admin/ipd/billing",
          icon: <IconFileInvoiceFilled stroke={2} className={medicalColors.warning}/>,
        },
      ],
    },
    {
      name: "Lab",
      url: "/admin/lab",
      icon: <IconFlask stroke={2} className={medicalColors.secondary}/>,
      childrens: [
        {
          name: "Test Orders",
          url: "/admin/lab/orders",
          icon: <IconClipboardList stroke={2} className={medicalColors.secondary}/>,
        },
        {
          name: "Sample Collection",
          url: "/admin/lab/collection",
          icon: <IconTestPipe2 stroke={2} className={medicalColors.secondary}/>,
        },
        {
          name: "Test Results",
          url: "/admin/lab/results",
          icon: <IconReportMedical stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Lab Reports",
          url: "/admin/lab/reports",
          icon: <IconFileText stroke={2} className={medicalColors.info}/>,
        },
      ],
    },
    {
      name: "Radiology",
      url: "/admin/radiology",
      icon: <IconScan stroke={2} className={medicalColors.purple}/>,
      childrens: [
        {
          name: "Imaging Orders",
          url: "/admin/radiology/orders",
          icon: <IconClipboardList stroke={2} className={medicalColors.purple}/>,
        },
        {
          name: "Scan Schedule",
          url: "/admin/radiology/schedule",
          icon: <IconCalendarTime stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Image Reports",
          url: "/admin/radiology/reports",
          icon: <IconPhoto stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Equipment Status",
          url: "/admin/radiology/equipment",
          icon: <IconDeviceDesktop stroke={2} className={medicalColors.neutral}/>,
        },
      ],
    },
    {
      name: "OT",
      url: "/admin/ot",
      icon: <IconSurgery stroke={2} className={medicalColors.purple}/>,
      childrens: [
        {
          name: "Surgery Schedule",
          url: "/admin/ot/schedule",
          icon: <IconCalendarTime stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "OT Booking",
          url: "/admin/ot/booking",
          icon: <IconBed stroke={2} className={medicalColors.primary}/>,
        },
        {
          name: "Surgery Records",
          url: "/admin/ot/records",
          icon: <IconClipboardData stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Equipment Management",
          url: "/admin/ot/equipment",
          icon: <IconTool stroke={2} className={medicalColors.neutral}/>,
        },
      ],
    },
    {
      name: "Pharmacy",
      url: "/admin/pharmacy",
      icon: <IconBottle stroke={2} className={medicalColors.teal}/>,
      childrens: [
        {
          name: "Medicine Inventory",
          url: "/admin/pharmacy/inventory",
          icon: <IconPackages stroke={2} className={medicalColors.teal}/>,
        },
        {
          name: "Prescriptions",
          url: "/admin/pharmacy/prescriptions",
          icon: <IconPrescription stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Medicine Dispensing",
          url: "/admin/pharmacy/dispensing",
          icon: <IconCapsule stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Stock Management",
          url: "/admin/pharmacy/stock",
          icon: <IconBoxSeam stroke={2} className={medicalColors.warning}/>,
        },
      ],
    },
    {
      name: "Application Settings",
      url: "/admin/applicationsettings",
      icon: <IconSettings2 stroke={2} className={medicalColors.neutral}/>,
      childrens: [
        {
          name: "User Management",
          url: "/admin/applicationsettings/users",
          icon: <IconUsers stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Role Management",
          url: "/admin/applicationsettings/roles",
          icon: <IconShieldCheck stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Application Management",
          url: "/admin/applicationsettings/application",
          icon: <IconSettings2 stroke={2} className={medicalColors.neutral}/>,
        },
      ]
    },
    {
      name: "Master Settings",
      url: "/admin/mastersettings",
      icon: <IconBuildingHospital stroke={2} className={medicalColors.primary}/>,
      childrens: [
        {
          name: "Hospital Master",
          url: "/admin/mastersettings/hospitals",
          icon: <IconBuildingHospital stroke={2} className={medicalColors.primary}/>,
        },
        {
          name: "Departments",
          url: "/admin/mastersettings/departments",
          icon: <IconMedicalCross stroke={2} className={medicalColors.success}/>,
        },
        {
          name: "Doctor Master",
          url: "/admin/mastersettings/doctors",
          icon: <IconStethoscope stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "Employee Master",
          url: "/admin/mastersettings/employees",
          icon: <IconBriefcase stroke={2} className={medicalColors.neutral}/>,
        },
        {
          name: "User Master",
          url: "/admin/mastersettings/users",
          icon: <IconUserFilled className={medicalColors.info}/>,
        },
        {
          name: "Country Master",
          url: "/admin/mastersettings/countrys",
          icon: <IconWorld stroke={2} className={medicalColors.primary}/>,
        },
        {
          name: "State Master",
          url: "/admin/mastersettings/states",
          icon: <IconFlag stroke={2} className={medicalColors.info}/>,
        },
        {
          name: "City Master",
          url: "/admin/mastersettings/citys",
          icon: <IconMapPinFilled className={medicalColors.success}/>,
        },
        {
          name: "Blood Group Master",
          url: "/admin/mastersettings/bloodgroups",
          icon: <IconDropletFilled className={medicalColors.danger}/>,
        },
        {
          name: "Designation Master",
          url: "/admin/mastersettings/designations",
          icon: <IconAwardFilled className={medicalColors.warning}/>,
        },
      ]
    },
    {
      name: "Audit Logs",
      url: "/admin/audit",
      icon: <IconReportAnalytics stroke={2} className={medicalColors.purple}/>,
    },
  ];

  const SidebarContent = (
    <div className={`h-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      {/* Logo/Header */}
      <div className="w-full py-4 px-4 text-white flex gap-2 items-center justify-center border-b border-slate-700 flex-shrink-0">
        <IconHeartHandshake size={sidebarOpen ? (isMobile ? 32 : 36) : 24} stroke={2} className="text-blue-400" />
        {sidebarOpen && <span className={`font-heading font-bold ${isMobile ? 'text-xl' : 'text-2xl'} text-white`}>DLS HMS</span>}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Info */}
        {sidebarOpen && (
          <div className="flex flex-col gap-2 items-center py-4 px-4 w-full border-b border-slate-700">
            <div className="bg-white rounded-full shadow-lg p-1">
              <Avatar variant="filled" src="/avatar.jpg" size={isMobile ? "lg" : "xl"} alt="User Avatar" />
            </div>
            <span className={`font-medium text-white text-center ${isMobile ? 'text-sm' : 'text-base'}`}>{user.name}</span>
            <Text c="dimmed" className={`text-slate-300 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>{user.role}</Text>
          </div>
        )}

        {/* Sidebar Menu */}
        <div className="flex flex-col gap-1 w-full px-3 py-4">
          {links.map((link) => (
            <SidebarLinkItem key={link.url} link={link} openedItem={openedItem} setOpenedItem={setOpenedItem} collapsed={!sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
          ))}
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      padding="0"
      size={280}
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {SidebarContent}
    </Drawer>
  ) : (
    <div className={`hidden md:block fixed h-screen shadow-xl border-r z-[999] transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      {SidebarContent}
    </div>
  );
};

export default ImprovedSidebar;