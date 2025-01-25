"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TagIcon } from "@/components/icons/ticket"
import { PartyPopperIcon } from "@/components/icons/callendar"
import { SettingsIcon } from "@/components/icons/settings"
import { CircleHelpIcon } from "@/components/icons/circle-help"
import { ChartColumnIncreasingIcon } from "@/components/icons/bar-chart"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Remove the 'as const' to make it mutable
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutPanelTopIcon,
      items: [
        {
          title: "Overview",
          url: "/dashboard/attendee",
        },
       
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: PartyPopperIcon,
      items: [
        {
          title: "All Events",
          url: "/dashboard/attendee/events",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Tickets",
      url: "#",
      icon: TagIcon,
      items: [
        {
          title: "View Tickets",
          url: "/dashboard/attendee/tickets",
        },
        {
          title: "Transfer Tickets",
          url: "/dashboard/attendee/tickets-transfer",
        },
     
      ],
    },
    // {
    //   title: "Connections",
    //   url: "#",
    //   icon: UsersIcon,
    //   items: [
    //     {
    //       title: "Connected List",
    //       url: "#",
    //     },
    //     {
    //       title: "Close Connection",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Analytics",
      url: "#",
      icon: ChartColumnIncreasingIcon,
      items: [
        {
          title: "Purchase Report",
          url: "/dashboard/attendee/analytics-purchases",
        },
        {
          title: "Events Attended",
          url: "/dashboard/attendee/analytics-events",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
      items: [
        {
          title: "General",
          url: "/dashboard/attendee/settings",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "#",
      icon: CircleHelpIcon,
      items: [
        {
          title: "Help/Faq",
          url: "/dashboard/attendee/support",
        },
      ],
    },
  ] as NavItemType[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white text-black" {...props}>
      <SidebarHeader>
      <div className="p-4 group-data-[collapsible=icon]:hidden">
          <h2 className="text-md font-semibold">Attendee Dashboard</h2>
        </div>
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