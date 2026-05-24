"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, RefreshCw, FileEdit } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderStatus =
    | "DRAFT"
    | "PENDING_PAYMENT"
    | "PAID"
    | "CANCELLED"
    | "REFUNDED";

interface OrderCustomer {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    document: string | null;
    address: string | null;
}

interface OrderItem {
    id: string;
    productName: string;
    presentationName: string | null;
    color: string | null;
    quantity: number;
    unitPrice: string | number;
    total: string | number;
}

interface OrderInvoice {
    id: string;
    invoiceNumber: string;
    status: "DRAFT" | "ISSUED" | "PAID" | "CANCELLED";
    total: string | number;
    issuedAt: string;
    paidAt: string | null;
    pdfUrl: string | null;
}

export interface OrderListItem {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    subtotal: string | number;
    tax: string | number;
    shipping: string | number;
    total: string | number;
    currency: string;
    paymentProvider: string | null;
    paymentReference: string | null;
    createdAt: string;
    updatedAt: string;
    paidAt: string | null;
    customer: OrderCustomer | null;
    items: OrderItem[];
    invoice: OrderInvoice | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const StatusBadge = ({ status }: { status: OrderStatus }) => {
    switch (status) {
        case "PAID":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 whitespace-nowrap">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    Pagado
                </span>
            );
        case "CANCELLED":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 whitespace-nowrap">
                    <XCircle className="h-3.5 w-3.5 shrink-0" />
                    Cancelado
                </span>
            );
        case "REFUNDED":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 whitespace-nowrap">
                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                    Reembolsado
                </span>
            );
        case "PENDING_PAYMENT":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700 whitespace-nowrap">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    Pend. pago
                </span>
            );
        default: // DRAFT
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600 whitespace-nowrap">
                    <FileEdit className="h-3.5 w-3.5 shrink-0" />
                    Borrador
                </span>
            );
    }
};

// ─── Columns ──────────────────────────────────────────────────────────────────
export const ordersTableColumns: ColumnDef<OrderListItem>[] = [
    {
        id: "order",
        accessorKey: "orderNumber",
        size: 220,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-3 h-8 font-semibold"
            >
                Orden
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
            </Button>
        ),
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <ShoppingCart className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <p
                            className="font-bold text-neutral-900 truncate max-w-40"
                            title={order.orderNumber}
                        >
                            {order.orderNumber}
                        </p>
                        <p className="text-xs text-neutral-400">
                            {order.id.slice(0, 8)}...
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        id: "customer",
        accessorFn: (row) =>
            `${row.customer?.name ?? ""} ${row.customer?.email ?? ""}`,
        size: 200,
        header: "Cliente",
        cell: ({ row }) => {
            const customer = row.original.customer;
            return (
                <div className="min-w-0">
                    <p
                        className="font-medium text-neutral-900 truncate max-w-40"
                        title={customer?.name ?? ""}
                    >
                        {customer?.name ?? "Sin cliente"}
                    </p>
                    <p
                        className="text-xs text-neutral-400 truncate max-w-40"
                        title={customer?.email ?? ""}
                    >
                        {customer?.email ?? "—"}
                    </p>
                </div>
            );
        },
    },
    {
        id: "items",
        size: 100,
        header: "Productos",
        cell: ({ row }) => {
            const count = row.original.items?.length ?? 0;
            return (
                <span className="text-sm text-neutral-600">
                    {count} {count === 1 ? "ítem" : "ítems"}
                </span>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "createdAt",
        size: 130,
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
                {formatDate(row.original.createdAt)}
            </span>
        ),
    },
    {
        accessorKey: "status",
        size: 140,
        header: "Estado",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
        filterFn: (row, _columnId, filterValue) => {
            if (!filterValue || filterValue === "ALL") return true;
            return row.original.status === filterValue;
        },
    },
    {
        accessorKey: "total",
        size: 130,
        header: () => <div className="text-right whitespace-nowrap">Total</div>,
        cell: ({ row }) => (
            <div className="text-right font-bold text-neutral-900 whitespace-nowrap">
                {formatCurrency(row.original.total)}
            </div>
        ),
    },
    {
        id: "actions",
        size: 120,
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => (
            <div className="text-right">
                <Link
                    href={`/dashboard/orders/${row.original.orderNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-700 whitespace-nowrap"
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