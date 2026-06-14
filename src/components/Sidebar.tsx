"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import Logo from "./Logo";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    label: "MANAGE",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/orders", badge: 12 },
      { label: "Products", icon: Package, href: "/products" },
      { label: "Machines", icon: Wrench, href: "/machines" },
      { label: "Customers", icon: Users, href: "/customers" },
    ],
  },
  {
    label: "GENERAL",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
      { label: "Notifications", icon: Bell, href: "/notifications" },
      { label: "Billings", icon: CreditCard, href: "/billings" },
    ],
  },
];

export interface SidebarUser {
  name: string;
  plan: string;
  initials: string;
}

export interface SidebarProps {
  companyName?: string;
  user?: SidebarUser;
}

export default function Sidebar({
  companyName = "Company Name",
  user = { name: "Paulo Trajano", plan: "Starter Plan", initials: "PT" },
}: SidebarProps) {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex h-full w-72 flex-col bg-white">
      {/* Logo + Nav */}
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-6 pt-6">
        <Logo companyName={companyName} />

        <nav className="flex flex-col gap-3">
          {NAV.map((section, idx) => (
            <div key={section.label}>
              {idx > 0 && <hr className="mb-3 border-border-color" />}
              <div className="flex flex-col gap-4">
                <p className="font-sans text-2xs font-semibold tracking-widest text-neutral-700">
                  {section.label}
                </p>
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "flex items-center justify-between rounded-lg px-3 py-2 transition-colors",
                          isActive
                            ? "bg-primary-100 text-primary-500"
                            : "text-black hover:bg-neutral-200",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon size={18} />
                          <span className="font-sans text-sm font-normal">
                            {item.label}
                          </span>
                        </span>
                        {item.badge != null && (
                          <span className="rounded-full bg-primary-200 px-2 py-1 font-sans text-2xs font-semibold text-primary-500">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Account */}
      <div className="flex items-center justify-between border-t border-border-color px-6 pb-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
            <span className="font-sans text-sm font-medium text-primary-500">
              {user.initials}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-sans text-sm text-black">{user.name}</p>
            <p className="font-sans text-xs text-neutral-600">{user.plan}</p>
          </div>
        </div>
        <ChevronRight size={20} className="shrink-0 text-neutral-500" />
      </div>
    </aside>
  );
}
