import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  section: string;
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        section: "Overview",
      },
    ],
  },
  {
    label: "MANAGE",
    items: [
      {
        label: "Orders",
        icon: ShoppingCart,
        href: "/orders",
        section: "Manage",
        badge: 12,
      },
      { label: "Products", icon: Package, href: "/products", section: "Manage" },
      { label: "Machines", icon: Wrench, href: "/machines", section: "Manage" },
      { label: "Customers", icon: Users, href: "/customers", section: "Manage" },
    ],
  },
  {
    label: "GENERAL",
    items: [
      { label: "Settings", icon: Settings, href: "/settings", section: "General" },
      { label: "Notifications", icon: Bell, href: "/notifications", section: "General" },
      { label: "Billings", icon: CreditCard, href: "/billings", section: "General" },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
