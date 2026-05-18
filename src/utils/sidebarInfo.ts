

export type UserRole = "ADMIN" | "OPERATOR";

export type SidebarLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  children?: Omit<SidebarLink, "children">[];
};

import {
  ClipboardList,
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Layers,
  Receipt,
  PlusCircle, // 🔥 crear línea
} from "lucide-react";

export const links: SidebarLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "OPERATOR"],
  },
  {
    href: "/dashboard/products",
    label: "Inventario",
    icon: Boxes,
    roles: ["ADMIN", "OPERATOR"],
    children: [
      {
        href: "/dashboard/products",
        label: "Ver productos",
        icon: ClipboardList,
        roles: ["ADMIN", "OPERATOR"],
      },
      {
        href: "/dashboard/products/create",
        label: "Crear producto",
        icon: PackagePlus,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    href: "/dashboard/lines",
    label: "Líneas",
    icon: Layers,
    roles: ["ADMIN", "OPERATOR"],
    children: [
      {
        href: "/dashboard/lines",
        label: "Ver líneas",
        icon: ClipboardList, // listado → consistente con productos
        roles: ["ADMIN", "OPERATOR"],
      },
      {
        href: "/dashboard/lines/create",
        label: "Crear línea",
        icon: PlusCircle, // 🔥 acción clara
        roles: ["ADMIN"],
      },
    ],
  },
  {
    href: "/dashboard/invoices",
    label: "Facturas",
    icon: Receipt,
    roles: ["ADMIN", "OPERATOR"],
  },
];