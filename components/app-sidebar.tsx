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
// import { TagIcon } from "@/components/icons/ticket"
import { UsersIcon } from "@/components/icons/users"
import { PartyPopperIcon } from "@/components/icons/callendar"
import { SettingsIcon } from "@/components/icons/settings"
import { CircleHelpIcon } from "@/components/icons/circle-help"
import { ChartColumnIncreasingIcon } from "@/components/icons/bar-chart"
import { LayoutPanelTopIcon } from "@/components/icons/dashboardIcon"
import  KeynoteSpeakerIcon  from "@/components/icons/keynote-speaker"
import  {StoreIcon}   from "@/components/icons/store"

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
      url: "/dashboard/organizer/attendee",
      icon: LayoutPanelTopIcon,
      isActive: true,
    },
    {
      title: "Events",
      url: "/dashboard/organizer/events",
      icon: PartyPopperIcon,
      items: [
        {
          title: "Create Event",
          url: "/dashboard/organizer/create-events",
        },
        {
          title: "Manage Events",
          url: "/dashboard/organizer/manage-events",
        },
        // {
        //   title: "Categories",
        //   url: "/events/categories",
        // },
      ],
    },
    // {
    //   title: "Ticketing",
    //   url: "#",
    //   icon: TagIcon,
    //   items: [
    //     {
    //       title: "Sell Tickets",
    //       url: "/dashboard/organizer/sell-tickets",
    //     },
    //     {
    //       title: "Manage Tickets",
    //       url: "/dashboard/organizer/manage-tickets",
    //     },
    //     // {
    //     //   title: "Pricing",
    //     //   url: "/ticketing/pricing",
    //     // },
    //   ],
    // },
    {
      title: "Attendees",
      url: "#",
      icon: UsersIcon,
      items: [
        {
          title: "Attendee List",
          url: "/dashboard/organizer/view-attendees",
        },
        {
          title: "Check-in",
          url: "/dashboard/organizer/attendees-checkin",
        },
      ],
    },
    {
      title: "Keynote Speaker",
      url: "#",
      icon: KeynoteSpeakerIcon,
      items: [
        {
          title: "Invite Speaker",
          url: "/dashboard/organizer/invite-speaker",
        },
        {
          title: "Speaker Lists",
          url: "/dashboard/organizer/view-speakers",
        },
      ],
    },
    // {
    //   title: "Vendor",
    //   url: "#",
    //   icon: StoreIcon ,
    //   items: [
    //     {
    //       title: "View Vendors",
    //       url: "/dashboard/organizer/view-vendors",
    //     },
    //   ],
    // },
    {
      title: "Analytics",
      url: "/dashboard/organizer/analytics",
      icon: ChartColumnIncreasingIcon,
      items: [
        {
          title: "Sales Report",
          url: "#",
        },
        {
          title: "Attendance",
          url: "#",
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
          url: "/dashboard/organizer/settings",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/dashboard/organizer/support",
      icon: CircleHelpIcon,
    },
  ] as NavItemType[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white text-black" {...props}>
      <SidebarHeader>
      <div className="p-4 group-data-[collapsible=icon]:hidden">
          <h2 className="text-md font-semibold">Organizer Dashboard</h2>
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