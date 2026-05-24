"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const formatDate = (date?: string | null) => {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status?.toUpperCase();

  if (normalized === "PAID") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 whitespace-nowrap">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        Pagada
      </span>
    );
  }

  if (normalized === "CANCELLED") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 whitespace-nowrap">
        <XCircle className="h-3.5 w-3.5 shrink-0" />
        Fallida
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 whitespace-nowrap">
      <Clock className="h-3.5 w-3.5 shrink-0" />
      Pendiente
    </span>
  );
};

// ─── Columns ──────────────────────────────────────────────────────────────────
export const invoiceColumns: ColumnDef<InvoiceListItem>[] = [
  {
    id: "invoice",
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 font-semibold"
      >
        Factura
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-neutral-900 truncate max-w-40" title={invoice.invoiceNumber}>
              {invoice.invoiceNumber}
            </p>
            <p className="text-xs text-neutral-400">
              {invoice.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "customer",
    accessorFn: (row) => {
      const c = row.order?.customer;
      return `${c?.name ?? ""} ${c?.email ?? ""}`;
    },
    header: "Cliente",
    cell: ({ row }) => {
      const customer = row.original.order?.customer;
      return (
        <div className="min-w-0">
          <p className="font-medium text-neutral-900 truncate max-w-40" title={customer?.name ?? ""}>
            {customer?.name ?? "Sin cliente"}
          </p>
          <p className="text-xs text-neutral-400 truncate max-w-40" title={customer?.email ?? ""}>
            {customer?.email ?? "—"}
          </p>
        </div>
      );
    },
  },
  {
    id: "orderNumber",
    accessorFn: (row) => row.order?.orderNumber ?? "",
    header: "Orden",
    cell: ({ row }) => {
      const orderNumber = row.original.order?.orderNumber ?? "—";
      return (
        <span
          className="text-neutral-600 text-sm truncate block max-w-35"
          title={orderNumber}
        >
          {orderNumber}
        </span>
      );
    },
  },
  {
    accessorKey: "issuedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 h-8 font-semibold whitespace-nowrap"
      >
        Fecha
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-neutral-600 text-sm whitespace-nowrap">
        {formatDate(row.original.issuedAt)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, _columnId, filterValue) => {
      if (!filterValue || filterValue === "ALL") return true;
      return row.original.status === filterValue;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right whitespace-nowrap">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-bold text-neutral-900 whitespace-nowrap">
        {formatCurrency(row.original.total)}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Link
          href={`/dashboard/invoices/${row.original.invoiceNumber}`}
          className="inline-flex items-center gap-1 rounded-full bg-neutral-950 px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-700 whitespace-nowrap"
        >
          <Eye className="h-3.5 w-3.5" />
          Ver detalle
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];