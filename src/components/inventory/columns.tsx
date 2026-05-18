"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export function getProductColumns(): ColumnDef<ProductListItem>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producto
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-slate-900">{row.original.name}</p>
          <p className="text-xs text-slate-500">{row.original.slug}</p>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <p className="max-w-xl line-clamp-2 text-sm leading-5 text-slate-600">
          {row.original.description || "—"}
        </p>
      ),
    },
    {
      accessorKey: "productLine.name",
      header: "Línea",
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.productLine?.name ?? "—"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Button size="sm" variant="outline">
          <Link
            href={`/dashboard/products/edit/${row.original.id}`}
            className="flex items-center gap-2"
          >
            <Pencil className="size-4" />
            Editar
          </Link>
        </Button>
      ),
    },
  ];
}