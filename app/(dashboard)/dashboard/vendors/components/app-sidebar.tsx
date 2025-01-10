"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
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
import { StoreIcon } from "@/components/icons/store"
import { PartyPopperIcon } from "@/components/icons/callendar"
import { SettingsIcon } from "@/components/icons/settings"
import { CircleHelpIcon } from "@/components/icons/circle-help"
import { ChartColumnIncreasingIcon } from "@/components/icons/bar-chart"
import { LayoutPanelTopIcon } from "@/components/icons/dashboardIcon"
import { CartIcon  } from "@/components/icons/cart"
import { ClipboardCheckIcon  } from "@/components/icons/clipboard"



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

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

const vendorData = {
  user: {
    name: "Food Vendor",
    email: "vendor@example.com",
    avatar: "/avatars/vendor.jpg",
  },
  teams: [
    {
      name: "Food Truck Co",
      logo: StoreIcon,
      plan: "Business",
    },
   
  ] as Team[],
  navMain: [
    {
      title: "Dashboard",
      url: "/vendor/dashboard",
      icon: LayoutPanelTopIcon,
      isActive: true,
    },
    {
      title: "My Events",
      url: "/vendor/events",
      icon: PartyPopperIcon,
      items: [
        {
          title: "Upcoming Events",
          url: "/vendor/events/upcoming",
        },
        {
          title: "Past Events",
          url: "/vendor/events/past",
        },
        {
          title: "Event Applications",
          url: "/vendor/events/applications",
        },
      ],
    },
    {
      title: "Menu Management",
      url: "/vendor/menu",
      icon: StoreIcon ,
      items: [
        {
          title: "Menu Items",
          url: "/vendor/menu/items",
        },
        {
          title: "Categories",
          url: "/vendor/menu/categories",
        },
        {
          title: "Special Offers",
          url: "/vendor/menu/offers",
        },
      ],
    },
    {
      title: "Orders",
      url: "/vendor/orders",
      icon: CartIcon ,
      items: [
        {
          title: "Active Orders",
          url: "/vendor/orders/active",
        },
        {
          title: "Order History",
          url: "/vendor/orders/history",
        },
        {
          title: "Pre-orders",
          url: "/vendor/orders/pre-orders",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/vendor/inventory",
      icon: ClipboardCheckIcon,
      items: [
        {
          title: "Stock Management",
          url: "/vendor/inventory/stock",
        },
        {
          title: "Purchase Orders",
          url: "/vendor/inventory/purchases",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/vendor/analytics",
      icon: ChartColumnIncreasingIcon,
      items: [
        {
          title: "Sales Reports",
          url: "/vendor/analytics/sales",
        },
        {
          title: "Popular Items",
          url: "/vendor/analytics/popular",
        },
        {
          title: "Customer Feedback",
          url: "/vendor/analytics/feedback",
        },
      ],
    },
    {
      title: "Settings",
      url: "/vendor/settings",
      icon: SettingsIcon,
      items: [
        {
          title: "Profile",
          url: "/vendor/settings/profile",
        },
        {
          title: "Business Info",
          url: "/vendor/settings/business",
        },
        {
          title: "Payment Settings",
          url: "/vendor/settings/payment",
        },
        {
          title: "Staff Management",
          url: "/vendor/settings/staff",
        },
      ],
    },
    {
      title: "Help & Support",
      url: "/vendor/support",
      icon: CircleHelpIcon,
    },
  ] as NavItemType[],
}

export function VendorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-white text-black" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={vendorData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={vendorData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={vendorData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}