import {
    Avatar,
    NavLink as MantineNavLink,
    Text,
  } from "@mantine/core";
  import {
    IconHeartbeat,
    IconKey,
  } from "@tabler/icons-react";
  import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { ReactNode } from "react";
  
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
  
    const defaultOpened = isActive || isChildActive;
  
    return (
      <MantineNavLink
        label={link.name}
        component={RouterNavLink}
        to={link.url}
        leftSection={link.icon}
        active={isActive}
        defaultOpened={defaultOpened}
        className="w-full text-light"
        childrenOffset={16}
      >
        {allChildren?.map((child) => (
          <SidebarLinkItem key={child.url} link={child} />
        ))}
      </MantineNavLink>
    );
  };
  
  const Sidebar = () => {
    const user = useSelector((state: any) => state.user);
  
    const links: SidebarLink[] = [
      {
        name: "Dashbord",
        url: "/admin/dashboard",
        icon: <IconHeartbeat stroke={2} />,
      },
      {
        name: "OPD",
        url: "/admin/dashboard",
        icon: <IconHeartbeat stroke={2} />,
        childrens: [
          {
            name: "Patient Registration",
            url: "/admin/dashboard/registration",
            icon: <IconHeartbeat />,
          },
          {
            name: "Patient Visit",
            url: "/admin/dashboard/visit",
            icon: <IconHeartbeat />,
          },
          {
            name: "OP Billing",
            url: "/admin/dashboard/billing",
            icon: <IconHeartbeat />,
          },
          {
            name: "Refund",
            url: "/admin/dashboard/refund",
            icon: <IconHeartbeat />,
          },
          {
            name: "Bill Cancellation",
            url: "/admin/dashboard/cancellation",
            icon: <IconHeartbeat />,
          },
          {
            name: "Advance",
            url: "/admin/dashboard/advance",
            icon: <IconHeartbeat />,
          },
          {
            name: "Due Settlement",
            url: "/admin/dashboard/settlement",
            icon: <IconHeartbeat />,
          },
          {
            name: "Report",
            url: "/admin/dashboard/report",
            icon: <IconHeartbeat />,
            children: [
              {
                name: "Password",
                url: "/admin/dashboard/report/password",
                icon: <IconKey size={14} />,
              },
            ],
          },
        ],
      },
      {
        name: "Profile",
        url: "/admin/profile",
        icon: <IconHeartbeat />,
      },
      {
        name: "Doctors",
        url: "/admin/doctors",
        icon: <IconHeartbeat />,
      },
      {
        name: "Patients",
        url: "/admin/patients",
        icon: <IconHeartbeat />,
      },
      {
        name: "Appointments",
        url: "/admin/appointments",
        icon: <IconHeartbeat />,
      },
      {
        name: "Pharmacy",
        url: "/admin/pharmacy",
        icon: <IconHeartbeat />,
      },
      {
        name: "Master Settings",
        url: "/admin/mastersettings",
        icon: <IconHeartbeat />,
      },
    ];
  
    return (
      <div className="flex">
        <div className="w-64" />
        <div className="w-64 fixed h-screen overflow-y-auto bg-dark flex flex-col gap-7 items-center">
          {/* Logo/Header */}
          <div className="fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center">
            <IconHeartbeat size={40} stroke={2.5} />
            <span className="font-heading font-semibold text-3xl">Pulse</span>
          </div>
  
          {/* User Info */}
          <div className="flex mt-20 flex-col gap-5">
            <div className="flex flex-col gap-1 items-center">
              <div className="pt-1 bg-white rounded-full shadow-lg">
                <Avatar variant="filled" src="/avatar.jpg" size="xl" alt="it's me" />
              </div>
              <span className="font-medium text-light">{user.name}</span>
              <Text c="dimmed" className="text-light" size="xs">
                {user.role}
              </Text>
            </div>
  
            {/* Sidebar Menu */}
            <div className="flex flex-col gap-1 w-full px-3">
              {links.map((link) => (
                <SidebarLinkItem key={link.url} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  