

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
  PlusCircle,
  BookOpenCheck,
  SquareLibrary,
  TruckElectric,
  Truck,
  BusFront, 
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
  {
    href: "/dashboard/articles",
    label: "Artículos",
    icon: Layers,
    roles: ["ADMIN", "OPERATOR"],
    children: [
      {
        href: "/dashboard/articles",
        label: "Ver artículos",
        icon: SquareLibrary, // listado → consistente con productos
        roles: ["ADMIN", "OPERATOR"],
      },
      {
        href: "/dashboard/articles/create",
        label: "Crear artículo",
        icon: BookOpenCheck, // 🔥 acción clara
        roles: ["ADMIN"],
      },
    ],
  },
    {
    href: "/dashboard/distributors",
    label: "Distribuidores",
    icon: BusFront,
    roles: ["ADMIN", "OPERATOR"],
    children: [
      {
        href: "/dashboard/distributors",
        label: "Ver distribuidores",
        icon: Truck, // listado → consistente con productos
        roles: ["ADMIN", "OPERATOR"],
      },
      {
        href: "/dashboard/distributors/create",
        label: "Crear distribuidor",
        icon: TruckElectric, // 🔥 acción clara
        roles: ["ADMIN"],
      },
    ],
  },
];