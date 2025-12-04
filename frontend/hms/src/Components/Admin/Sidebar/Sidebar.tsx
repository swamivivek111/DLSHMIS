import { Avatar, Drawer, Text, NavLink as MantineNavLink, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBook, IconClipboardTextFilled, IconCoinRupee, IconDashboard, IconFileInvoiceFilled, IconHeartbeat, IconNotes, IconProgress, IconReceiptRefund, IconReceiptRupee, IconReport, IconSettings, IconSquareRoundedPlus, IconSquareX, IconStethoscope, IconTransitionRightFilled, IconTruckReturn, IconUser, IconUsers, IconVaccineBottle, IconMicroscope, IconRadioactive, IconBuildingHospital, IconPill, IconClipboardList, IconTestPipe, IconReportMedical, IconFileText, IconCalendarTime, IconPhoto, IconDeviceDesktop, IconBed, IconClipboardData, IconTool, IconPackages, IconPrescription, IconBottle, IconBoxSeam, IconWorld, IconMapPin, IconDroplet, IconBriefcase, IconAward, IconHome, IconDoor, IconNurse, IconMedicalCross, IconCurrencyRupee, IconBuilding, IconFlag, IconLocation, IconId, IconUserCheck, IconUserFilled, IconHomeFilled, IconMapPinFilled, IconDropletFilled, IconAwardFilled, IconIdBadge2, IconUserShield, IconBadgeFilled, IconSearch } from '@tabler/icons-react';
import { ReactNode, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';

interface SidebarLink {
  name: string;
  url: string;
  icon?: ReactNode;
  children?: SidebarLink[];
  childrens?: SidebarLink[]; // to support both spellings
}

const SidebarLinkItem = ({ link, openedItem, setOpenedItem, collapsed, handleSidebarToggle, masterSearch, setMasterSearch }: { link: SidebarLink; openedItem: string | null; setOpenedItem: (item: string | null) => void; collapsed?: boolean; handleSidebarToggle?: () => void; masterSearch?: string; setMasterSearch?: (search: string) => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === link.url;
  let allChildren = link.children || link.childrens;
  
  // Filter and sort Master Settings children based on search
  if (link.name === 'Master Settings' && allChildren) {
    if (masterSearch) {
      allChildren = allChildren.filter(child => 
        child.name.toLowerCase().includes(masterSearch.toLowerCase())
      );
    }
    // Sort alphabetically
    allChildren = [...allChildren].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  const isChildActive = allChildren?.some((child) =>
    location.pathname.startsWith(child.url)
  );

  const baseClass = "flex items-center w-full h-11 font-medium rounded-lg transition-colors";
  const activeParentClass = "bg-white text-dark";
  const activeChildClass = "bg-white text-dark";
  const defaultClass = "text-white hover:bg-gray-100 hover:text-gray-600";

  const linkClass = isActive
  ? `${baseClass} ${activeParentClass}`
  : isChildActive
  ? `${baseClass} ${activeChildClass}`
  : `${baseClass} ${defaultClass}`;

  const isOpened = openedItem === link.name || ((isActive || isChildActive) && link.name !== 'Application Settings' && link.name !== 'Master Settings');

  if (collapsed) {
    return (
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer mx-1 mb-2 ${
          isActive || isChildActive ? 'bg-white text-dark' : 'text-white hover:bg-gray-100 hover:text-gray-600'
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

  // For items without children, render as simple NavLink
  if (!allChildren || allChildren.length === 0) {
    return (
      <MantineNavLink
        label={link.name}
        component={RouterNavLink}
        to={link.url}
        leftSection={link.icon}
        active={isActive}
        className={linkClass}
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
      />
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
      {link.name === 'Master Settings' && isOpened && (
        <div className="px-2 py-2">
          <TextInput
            placeholder="Search masters..."
            size="xs"
            leftSection={<IconSearch size={14} className="text-orange-500" />}
            rightSection={masterSearch && (
              <IconSquareX 
                size={14} 
                className="cursor-pointer text-orange-500 hover:text-white" 
                onClick={(e) => {
                  e.stopPropagation();
                  setMasterSearch && setMasterSearch('');
                }}
              />
            )}
            value={masterSearch || ''}
            onChange={(e) => setMasterSearch && setMasterSearch(e.target.value)}
            className="mb-2"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {link.name === 'Master Settings' ? (
        allChildren?.map((child) => (
          <MantineNavLink
            key={child.url}
            label={child.name}
            component={RouterNavLink}
            to={child.url}
            leftSection={child.icon}
            active={location.pathname === child.url}
            className="text-white hover:bg-gray-100 hover:text-gray-600"
            styles={{
              label: {
                fontSize: '12px',
                fontWeight: 400,
                color: 'white'
              },
              root: {
                color: 'white',
                '&:hover': {
                  '& .mantine-NavLink-label': {
                    color: '#4b5563 !important'
                  },
                  '& .tabler-icon': {
                    color: '#4b5563 !important'
                  }
                }
              }
            }}
          />
        ))
      ) : (
        allChildren?.map((child) => (
          <SidebarLinkItem key={child.url} link={child} openedItem={openedItem} setOpenedItem={setOpenedItem} collapsed={collapsed} />
        ))
      )}
    </MantineNavLink>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
}
const Sidebar = ({
  isOpen,
  onClose,
  sidebarOpen,
  handleSidebarToggle,
}: SidebarProps) => {
  const user = useSelector((state: any) => state.user);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [openedItem, setOpenedItem] = useState<string | null>(null);
  const [masterSearch, setMasterSearch] = useState('');
  const links: SidebarLink[] = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <IconDashboard stroke={4} className="text-orange-500"/>,
    },
    {
      name: "Appointments",
      url: "",
      icon: <IconClipboardTextFilled className="text-orange-500"/>,
      childrens: [
          {
            name: "Doctor Schedule New",
            url: "/admin/appointments/schedule",
            icon: <IconTransitionRightFilled className="text-orange-500" stroke={2}/>,
          },

          {
            name: "Book Appointment New",
            url: "/admin/appointments/bookappointment",
            icon: <IconBook className="text-orange-500" stroke={2}/>,
          },


        ],
    },
    {
      name: "OPD",
      url: "",
      icon: <IconSquareRoundedPlus className="text-orange-500" stroke={2} />,
      childrens: [
        {
          name: "Patient Registration",
          url: "/admin/opd/registration",
          icon: <IconUserFilled className="text-orange-500"/>,
        },
        {
          name: "Patient Visit",
          url: "/admin/opd/visits",
          icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Queue Management",
          url: "/admin/opd/queue",
          icon: <IconUsers className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Vitals Recording",
          url: "/admin/opd/vitals",
          icon: <IconHeartbeat className="text-orange-500" stroke={2}/>,
        },
        {
          name: "OP Billing",
          url: "/admin/opd/billing",
          icon: <IconFileInvoiceFilled className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Advance Payment",
          url: "/admin/opd/advance",
          icon: <IconReceiptRupee className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Refund",
          url: "/admin/opd/refund",
          icon: <IconReceiptRefund className="text-orange-500" stroke={2} />,
        },
        {
          name: "Bill Cancellation",
          url: "/admin/opd/cancellation",
          icon: <IconSquareX className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Due Settlement",
          url: "/admin/opd/settlement",
          icon: <IconCoinRupee className="text-orange-500" stroke={2}/>,
        },
        {
          name: "OPD Reports",
          url: "/admin/opd/reports",
          icon: <IconReport className="text-orange-500" stroke={2}/>,
          children: [
            {
              name: "Daily OPD Report",
              url: "/admin/opd/reports/daily",
              icon: <IconReport className="text-orange-500" stroke={2}/>,
            },
            {
              name: "Patient Visit Report",
              url: "/admin/opd/reports/visits",
              icon: <IconReport className="text-orange-500" stroke={2}/>,
            },
            {
              name: "Revenue Report",
              url: "/admin/opd/reports/revenue",
              icon: <IconReport className="text-orange-500" stroke={2}/>,
            },
          ],
        },
      ],
    },
    {
      name: "IPD",
      url: "",
      icon: <IconSquareRoundedPlus className="text-orange-500" stroke={2} />,
      childrens: [
        {
          name: "Nursing",
          url: "/admin/dashboard/registration",
          icon: <IconBook className="text-orange-500" stroke={2}/>,
          children:[
              {
                  name: "Vitals",
                  url: "/admin/dashboard/settlement",
                  icon: <IconHeartbeat className="text-orange-500" stroke={2}/>,
              },
              {
                  name: "Progress Notes",//Doctor and Nursing show in one with radio buttons
                  url: "/admin/dashboard/settlement",
                  icon: <IconNotes className="text-orange-500" stroke={2}/>,
              },
              {
                  name: "Indent",//Pharmacy and Investigasion show in one with radio buttons
                  url: "/admin/dashboard/settlement",
                  icon: <IconProgress className="text-orange-500" stroke={2}/>,
              },
              {
                  name: "Intake Output",
                  url: "/admin/dashboard/settlement",
                  icon: <IconCoinRupee className="text-orange-500" stroke={2}/>,
              },
              {
                  name: "Drug Return",
                  url: "/admin/dashboard/settlement",
                  icon: <IconTruckReturn className="text-orange-500" stroke={2}/>,
              },
              {
                  name: "Discharge Summary",
                  url: "/admin/dashboard/settlement",
                  icon: <IconReport className="text-orange-500" stroke={2}/>,
              },
          ]
        },
        {
          name: "Admission",
          url: "/admin/dashboard/visit",
          icon: <IconTransitionRightFilled className="text-orange-500" stroke={2}/>,
        },
        {
          name: "IP Billing",
          url: "/admin/dashboard/billing",
          icon: <IconFileInvoiceFilled className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Refund",
          url: "/admin/dashboard/refund",
          icon: <IconReceiptRefund className="text-orange-500" stroke={2} />,
        },
        {
          name: "Bill Cancellation",
          url: "/admin/dashboard/cancellation",
          icon: <IconSquareX className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Advance",
          url: "/admin/dashboard/advance",
          icon: <IconReceiptRupee className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Due Settlement",
          url: "/admin/dashboard/settlement",
          icon: <IconCoinRupee className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Discharge",
          url: "/admin/dashboard/settlement",
          icon: <IconCoinRupee className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Reports",
          url: "/admin/dashboard/report",
          icon: <IconReport className="text-orange-500" stroke={2}/>,
          children: [
            {
              name: "Daily Records",
              url: "/admin/dashboard/report/password",
              icon: <IconReport className="text-orange-500" stroke={2}/>,
            },
          ],
        },
      ],
    },
    /*{
      name: "Profile",
      url: "/admin/profile",
      icon: <IconUser className="text-orange-500" stroke={2}/>,
    },
    {
      name: "Doctors",
      url: "/admin/doctors",
      icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
    },
    {
      name: "Patients",
      url: "/admin/patients",
      icon: <IconWheelchair className="text-orange-500" stroke={2}/>,
    },*/
    {
      name: "Lab",
      url: "/admin/lab",
      icon: <IconMicroscope className="text-orange-500" stroke={2}/>,
      childrens: [
        {
          name: "Test Orders",
          url: "/admin/lab/orders",
          icon: <IconClipboardList className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Sample Collection",
          url: "/admin/lab/collection",
          icon: <IconTestPipe className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Test Results",
          url: "/admin/lab/results",
          icon: <IconReportMedical className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Lab Reports",
          url: "/admin/lab/reports",
          icon: <IconFileText className="text-orange-500" stroke={2}/>,
        },
      ],
    },
    {
      name: "Radiology",
      url: "/admin/radiology",
      icon: <IconRadioactive className="text-orange-500" stroke={2}/>,
      childrens: [
        {
          name: "Imaging Orders",
          url: "/admin/radiology/orders",
          icon: <IconClipboardList className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Scan Schedule",
          url: "/admin/radiology/schedule",
          icon: <IconCalendarTime className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Image Reports",
          url: "/admin/radiology/reports",
          icon: <IconPhoto className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Equipment Status",
          url: "/admin/radiology/equipment",
          icon: <IconDeviceDesktop className="text-orange-500" stroke={2}/>,
        },
      ],
    },
    {
      name: "OT",
      url: "/admin/ot",
      icon: <IconBuildingHospital className="text-orange-500" stroke={2}/>,
      childrens: [
        {
          name: "Surgery Schedule",
          url: "/admin/ot/schedule",
          icon: <IconCalendarTime className="text-orange-500" stroke={2}/>,
        },
        {
          name: "OT Booking",
          url: "/admin/ot/booking",
          icon: <IconBed className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Surgery Records",
          url: "/admin/ot/records",
          icon: <IconClipboardData className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Equipment Management",
          url: "/admin/ot/equipment",
          icon: <IconTool className="text-orange-500" stroke={2}/>,
        },
      ],
    },
    {
      name: "Pharmacy",
      url: "/admin/pharmacy",
      icon: <IconPill className="text-orange-500" stroke={2}/>,
      childrens: [
        {
          name: "Medicine Inventory",
          url: "/admin/pharmacy/inventory",
          icon: <IconPackages className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Prescriptions",
          url: "/admin/pharmacy/prescriptions",
          icon: <IconPrescription className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Medicine Dispensing",
          url: "/admin/pharmacy/dispensing",
          icon: <IconBottle className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Stock Management",
          url: "/admin/pharmacy/stock",
          icon: <IconBoxSeam className="text-orange-500" stroke={2}/>,
        },
      ],
    },
    {
      name: "Application Settings",
      url: "/admin/applicationsettings",
      icon: <IconSettings className="text-orange-500" stroke={2}/>,
      childrens:[
          {
              name: "User Management",
              url: "/admin/applicationsettings/users",
              icon: <IconUsers className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Role Management",
              url: "/admin/applicationsettings/roles",
              icon: <IconUser className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Application Management",
              url: "/admin/applicationsettings/application",
              icon: <IconSettings className="text-orange-500" stroke={2}/>,
          },
      ]
    },
    {
      name: "Master Settings",
      url: "/admin/mastersettings",
      icon: <IconSettings className="text-orange-500" stroke={2}/>,
      childrens:[
          {
              name: "Category Master",
              url: "/admin/mastersettings/categories",
              icon: <IconAward className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Hospital Master",
              url: "/admin/mastersettings/hospitals",
              icon: <IconBuildingHospital className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Departments",
              url: "/admin/mastersettings/departments",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Doctor Master",
              url: "/admin/mastersettings/doctors",
              icon: <IconStethoscope className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Employee Master",
              url: "/admin/mastersettings/employees",
              icon: <IconBriefcase className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "User Master",
              url: "/admin/mastersettings/users",
              icon: <IconUserFilled className="text-orange-500"/>,
          },
          {
              name: "OT Master",
              url: "/admin/mastersettings/ots",
              icon: <IconBuildingHospital className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Ward Master",
              url: "/admin/mastersettings/wards",
              icon: <IconHomeFilled className="text-orange-500"/>,
          },
          {
              name: "Room Master",
              url: "/admin/mastersettings/rooms",
              icon: <IconDoor className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Bed Master",
              url: "/admin/mastersettings/beds",
              icon: <IconBed className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Nursing Station",
              url: "/admin/mastersettings/nursing",
              icon: <IconNurse className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Tariff Master",
              url: "/admin/mastersettings/tariffs",
              icon: <IconCoinRupee className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Company Master",//Vendor and Suppliyer
              url: "/admin/mastersettings/companies",
              icon: <IconBuilding className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Patient Category",
              url: "/admin/mastersettings/patient-categories",
              icon: <IconUsers className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Authority Master",
              url: "/admin/mastersettings/authorities",
              icon: <IconBadgeFilled className="text-orange-500"/>,
          },
          {
              name: "Country Master",
              url: "/admin/mastersettings/countrys",
              icon: <IconWorld className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "State Master",
              url: "/admin/mastersettings/states",
              icon: <IconFlag className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Taluka Master",
              url: "/admin/mastersettings/talukas",
              icon: <IconMapPinFilled className="text-orange-500"/>,
          },
           {
              name: "City Master",
              url: "/admin/mastersettings/citys",
              icon: <IconMapPinFilled className="text-orange-500"/>,
          },
          {
              name: "Title Master",
              url: "/admin/mastersettings/titles",
              icon: <IconIdBadge2 className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Blood Group Master",
              url: "/admin/mastersettings/bloodgroups",
              icon: <IconDropletFilled className="text-orange-500"/>,
          },
          {
              name: "Designation Master",
              url: "/admin/mastersettings/designations",
              icon: <IconAwardFilled className="text-orange-500"/>,
          },
          {
              name: "District Master",
              url: "/admin/mastersettings/districts",
              icon: <IconBadgeFilled className="text-orange-500"/>,
          },
          {
              name: "Cash Counter Master",
              url: "/admin/mastersettings/cash-counters",
              icon: <IconCurrencyRupee className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Consultation Charges",
              url: "/admin/mastersettings/consultation-charges",
              icon: <IconStethoscope className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Source Master",
              url: "/admin/mastersettings/sources",
              icon: <IconWorld className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Referral Name Master",
              url: "/admin/mastersettings/referral-names",
              icon: <IconUserShield className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Referral Type Master",
              url: "/admin/mastersettings/referral-types",
              icon: <IconBadgeFilled className="text-orange-500"/>,
          },
          {
              name: "Service Class Master",
              url: "/admin/mastersettings/service-classes",
              icon: <IconMedicalCross className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Service Type Master",
              url: "/admin/mastersettings/service-types",
              icon: <IconMedicalCross className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Billing Head Master",
              url: "/admin/mastersettings/billing-heads",
              icon: <IconCurrencyRupee className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Ward Group Master",
              url: "/admin/mastersettings/ward-groups",
              icon: <IconBuildingHospital className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Service Group Master",
              url: "/admin/mastersettings/service-groups",
              icon: <IconMedicalCross className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Service Sub Group Master",
              url: "/admin/mastersettings/service-sub-groups",
              icon: <IconMedicalCross className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Service Master",
              url: "/admin/mastersettings/services",
              icon: <IconMedicalCross className="text-orange-500" fill="currentColor" stroke={1}/>,
          },
          {
              name: "Tariff Service Mapping",
              url: "/admin/mastersettings/tariff-service-mappings",
              icon: <IconCurrencyRupee className="text-orange-500" fill="currentColor" stroke={1}/>,
          },

          

      ]
    },
    {
      name: "Audit Logs",
      url: "/admin/audit",
      icon: <IconClipboardData className="text-orange-500" stroke={2}/>,
    },
  ];
  const SidebarContent = (
    <div className={`h-full bg-[#202A44] flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      {/* Logo/Header - Fixed */}
      <div className="w-full py-4 px-4 text-white flex gap-2 items-center justify-center border-b border-gray-600 flex-shrink-0">
        <IconHeartbeat size={sidebarOpen ? (isMobile ? 32 : 36) : 24} stroke={2.5} className="text-orange-500" />
        {sidebarOpen && <span className={`font-heading font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>DLS HMS</span>}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Info */}
        {sidebarOpen && (
          <div className="flex flex-col gap-2 items-center py-4 px-4 w-full border-b border-gray-600">
            <div className="bg-white rounded-full shadow-lg p-1">
              <Avatar variant="filled" src="/avatar.jpg" size={isMobile ? "lg" : "xl"} alt="User Avatar" />
            </div>
            <span className={`font-medium text-white text-center ${isMobile ? 'text-sm' : 'text-base'}`}>{user.name}</span>
            <Text c="dimmed" className={`text-gray-300 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>{user.role}</Text>
          </div>
        )}

        {/* Sidebar Menu */}
        <div className="flex flex-col gap-1 w-full px-3 py-4">
          {links.map((link) => (
            <SidebarLinkItem 
              key={link.url} 
              link={link} 
              openedItem={openedItem} 
              setOpenedItem={setOpenedItem} 
              collapsed={!sidebarOpen} 
              handleSidebarToggle={handleSidebarToggle} 
              {...(link.name === 'Master Settings' && { masterSearch, setMasterSearch })}
            />
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
    <div className={`hidden md:block fixed h-screen shadow-lg border-r z-[999] transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      {SidebarContent}
    </div>
  );
};

export default Sidebar;
