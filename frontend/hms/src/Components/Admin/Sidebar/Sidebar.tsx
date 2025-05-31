import { Avatar, Drawer, Text, NavLink as MantineNavLink, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBook, IconClipboardTextFilled, IconCoinRupee, IconDashboard, IconFileInvoiceFilled, IconHeartbeat, IconNotes, IconProgress, IconReceiptRefund, IconReceiptRupee, IconReport, IconSettings, IconSquareRoundedPlus, IconSquareX, IconStethoscope, IconTransitionRightFilled, IconTruckReturn, IconUser, IconUsers, IconVaccineBottle } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, NavLink as RouterNavLink } from 'react-router-dom';

interface SidebarLink {
  name: string;
  url: string;
  icon?: ReactNode;
  children?: SidebarLink[];
  childrens?: SidebarLink[]; // to support both spellings
}

const SidebarLinkItem = ({ link }: { link: SidebarLink }) => {
  const location = useLocation();

  const isActive = location.pathname === link.url;
  const allChildren = link.children || link.childrens;
  const isChildActive = allChildren?.some((child) =>
    location.pathname.startsWith(child.url)
  );

  const baseClass = "flex items-center w-full h-11 font-medium rounded-lg transition-colors";
  const activeParentClass = "bg-white text-dark";
  const activeChildClass = "bg-white text-dark";
  const defaultClass = "text-white hover:bg-gray-100 hover:text-dark";

  const linkClass = isActive
  ? `${baseClass} ${activeParentClass}`
  : isChildActive
  ? `${baseClass} ${activeChildClass}`
  : `${baseClass} ${defaultClass}`;

  const defaultOpened = isActive || isChildActive;

  return (
    <MantineNavLink
      label={link.name}
      component={RouterNavLink}
      to={link.url}
      leftSection={link.icon}
      active={isActive}
      defaultOpened={defaultOpened}
      className={linkClass}
      childrenOffset={16}
    >
      {allChildren?.map((child) => (
        <SidebarLinkItem key={child.url} link={child} />
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
const Sidebar = ({
  isOpen,
  onClose,
  sidebarOpen,
}: SidebarProps) => {
  const user = useSelector((state: any) => state.user);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const links: SidebarLink[] = [
    {
      name: "Dashbord",
      url: "/admin/dashboard",
      icon: <IconDashboard stroke={4} className="text-orange-500"/>,
    },
    {
      name: "Appointments",
      url: "",
      icon: <IconClipboardTextFilled className="text-orange-500"/>,
      childrens: [
          {
            name: "Book Appointment",
            url: "/admin/appointments/addappointment",
            icon: <IconBook className="text-orange-500" stroke={2}/>,
          },
          {
            name: "Doctor Schedule",
            url: "/admin/dashboard/visit",
            icon: <IconTransitionRightFilled className="text-orange-500" stroke={2}/>,
          },
          {
            name: "Doctor Queue",
            url: "/admin/dashboard/cancellation",
            icon: <IconSquareX className="text-orange-500" stroke={2}/>,
          },
          {
            name: "Appointment List",
            url: "/admin/appointments/list",
            icon: <IconReceiptRupee className="text-orange-500" stroke={2}/>,
          }
        ],
    },
    {
      name: "OPD",
      url: "",
      icon: <IconSquareRoundedPlus className="text-orange-500" stroke={2} />,
      childrens: [
        {
          name: "Patient Registration",
          url: "/admin/dashboard/registration",
          icon: <IconBook className="text-orange-500" stroke={2}/>,
        },
        {
          name: "Patient Visit",
          url: "/admin/dashboard/visit",
          icon: <IconTransitionRightFilled className="text-orange-500" stroke={2}/>,
        },
        {
          name: "OP Billing",
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
          name: "Queue Management",
          url: "/admin/dashboard/refund",
          icon: <IconReceiptRefund className="text-orange-500" stroke={2} />,
        },
        {
          name: "Vitals",
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
      url: "/admin/pharmacy",
      icon: <IconVaccineBottle className="text-orange-500" stroke={2}/>,
    },
    {
      name: "Radiology",
      url: "/admin/pharmacy",
      icon: <IconVaccineBottle className="text-orange-500" stroke={2}/>,
    },
    {
      name: "OT",
      url: "/admin/pharmacy",
      icon: <IconVaccineBottle className="text-orange-500" stroke={2}/>,
    },
    {
      name: "Pharmacy",
      url: "/admin/pharmacy",
      icon: <IconVaccineBottle className="text-orange-500" stroke={2}/>,
    },
    {
      name: "Master Settings",
      url: "/admin/mastersettings",
      icon: <IconSettings className="text-orange-500" stroke={2}/>,
      childrens:[
          {
              name: "Departments",
              url: "/admin/mastersettings/departments",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Doctor Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Emloyee Master",
              url: "/admin/doctors",
              icon: <IconUsers className="text-orange-500" stroke={2}/>,
          },
          {
              name: "User Master",
              url: "/admin/doctors",
              icon: <IconUser className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Department Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "OT Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Ward Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Room Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Bed Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Nursing Station",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Service Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Tariff Master",
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
          {
              name: "Company Master",//Vendor and Suppliyer
              url: "/admin/doctors",
              icon: <IconStethoscope className="text-orange-500" stroke={2}/>,
          },
      ]
    },
  ];
  const SidebarContent = (
    <div className="h-full w-64 overflow-y-auto bg-[#202A44] flex flex-col gap-7 items-center p-4">
      {/* Logo/Header */}
      <div className="py-3 text-white flex gap-1 items-center rounded-xl">
        <IconHeartbeat size={40} stroke={2.5} />
        <span className="font-heading font-semibold text-3xl">DLS HMS</span>
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-1 items-center mt-4">
        <div className="pt-1 bg-white rounded-full shadow-lg">
          <Avatar variant="filled" src="/avatar.jpg" size="xl" alt="it's me" />
        </div>
        <span className="font-medium text-light">{user.name}</span>
        <Text c="dimmed" className="text-light" size="xs">{user.role}</Text>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col gap-1 w-full px-3 mt-6">
        {links.map((link) => (
          <SidebarLinkItem key={link.url} link={link} />
        ))}
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      padding="0"
      size="ms"
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {SidebarContent}
    </Drawer>
  ) : sidebarOpen ? (
    <div className="hidden md:block w-64 fixed h-screen bg-white shadow-lg border-r z-[999]">
      {SidebarContent}
    </div>
  ) : null;
};

export default Sidebar;
