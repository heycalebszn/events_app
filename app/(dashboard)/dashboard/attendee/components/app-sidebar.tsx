"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TicketIcon } from "@/components/icons/ticket"
import { UsersIcon } from "@/components/icons/users"
import { PartyPopperIcon } from "@/components/icons/callendar"
import { SettingsIcon } from "@/components/icons/settings"
import { CircleHelpIcon } from "@/components/icons/circle-help"
import { BarChart3Icon } from "@/components/icons/bar-chart"
import { LayoutPanelTopIcon } from "@/components/icons/dashboardIcon"
import { LucideIcon } from "lucide-react"

// Updated interface to include React.FC as a valid icon type
interface NavItemType {
  title: string
  url: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

// Define a Team type that matches the TeamSwitcher expectations
interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Remove the 'as const' to make it mutable
  teams: [
    {
      name: "Acme Events",
      logo: PartyPopperIcon,
      plan: "Enterprise",
    },
    {
      name: "City Tickets",
      logo: TicketIcon,
      plan: "Startup",
    },
  ] as Team[],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/attendee",
      icon: LayoutPanelTopIcon,
      isActive: true,
    },
    {
      title: "Events",
      url: "/events",
      icon: PartyPopperIcon,
      items: [
        {
          title: "All Events",
          url: "/events",
        },
        {
          title: "Categories",
          url: "/events/categories",
        },
      ],
    },
    {
      title: "Tickets",
      url: "/ticketing",
      icon: TicketIcon,
      items: [
        {
          title: "View Tickets",
          url: "#",
        },
        {
          title: "Transfer Tickets",
          url: "#",
        },
     
      ],
    },
    {
      title: "Connections",
      url: "#",
      icon: UsersIcon,
      items: [
        {
          title: "Connected List",
          url: "#",
        },
        {
          title: "Close Connection",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3Icon,
      items: [
        {
          title: "Purchase Report",
          url: "#",
        },
        {
          title: "Events Attended",
          url: "/analytics/attendance",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Integrations",
          url: "/settings/integrations",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/support",
      icon: CircleHelpIcon,
    },
  ] as NavItemType[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white text-black" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}