/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    ShoppingCart,
    Search,
    Eye,
    CheckCircle2,
    Clock,
    XCircle,
    RefreshCw,
    FileEdit,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/private/orders/useOrders";
import { ordersTableColumns, OrderListItem } from "./orders-columns";
import Link from "next/link";

// ─── Helpers (duplicados aquí para la vista de tarjetas) ──────────────────────
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

const StatusBadge = ({ status }: { status: OrderListItem["status"] }) => {
    switch (status) {
        case "PAID":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 whitespace-nowrap">
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                    Pagado
                </span>
            );
        case "CANCELLED":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 whitespace-nowrap">
                    <XCircle className="h-3 w-3 shrink-0" />
                    Cancelado
                </span>
            );
        case "REFUNDED":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 whitespace-nowrap">
                    <RefreshCw className="h-3 w-3 shrink-0" />
                    Reembolsado
                </span>
            );
        case "PENDING_PAYMENT":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 whitespace-nowrap">
                    <Clock className="h-3 w-3 shrink-0" />
                    Pend. pago
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 whitespace-nowrap">
                    <FileEdit className="h-3 w-3 shrink-0" />
                    Borrador
                </span>
            );
    }
};

// ─── Tarjeta individual ───────────────────────────────────────────────────────
function OrderCard({ order }: { order: OrderListItem }) {
    const customer = order.customer;
    const itemCount = order.items?.length ?? 0;

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            {/* Fila superior: número de orden + estado */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <ShoppingCart className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <p
                            className="text-xs font-bold text-neutral-900 truncate max-w-45"
                            title={order.orderNumber}
                        >
                            {order.orderNumber}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                            {order.id.slice(0, 8)}...
                        </p>
                    </div>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Separador */}
            <div className="h-px bg-neutral-100" />

            {/* Info cliente + meta */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <div>
                    <p className="text-neutral-400">Cliente</p>
                    <p className="font-medium text-neutral-800 truncate" title={customer?.name ?? ""}>
                        {customer?.name ?? "Sin cliente"}
                    </p>
                </div>
                <div>
                    <p className="text-neutral-400">Correo</p>
                    <p className="font-medium text-neutral-800 truncate" title={customer?.email ?? ""}>
                        {customer?.email ?? "—"}
                    </p>
                </div>
                <div>
                    <p className="text-neutral-400">Fecha</p>
                    <p className="font-medium text-neutral-800">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                    <p className="text-neutral-400">Productos</p>
                    <p className="font-medium text-neutral-800">
                        {itemCount} {itemCount === 1 ? "ítem" : "ítems"}
                    </p>
                </div>
            </div>

            {/* Fila inferior: total + acción */}
            <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-black text-neutral-900">
                    {formatCurrency(order.total)}
                </p>
                <Link
                    href={`/dashboard/orders/${order.orderNumber}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-700"
                >
                    <Eye className="h-3.5 w-3.5" />
                    Ver detalle
                </Link>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OrdersDashboardPage() {
    const { data: orders = [], isLoading, isError } = useOrders();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: orders,
        columns: ordersTableColumns,
        state: { sorting, columnFilters, globalFilter },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _columnId, filterValue: string) => {
            const search = filterValue.toLowerCase();
            const customer = row.original.customer;
            const orderNumber = row.original.orderNumber ?? "";
            return (
                (customer?.name ?? "").toLowerCase().includes(search) ||
                (customer?.email ?? "").toLowerCase().includes(search) ||
                orderNumber.toLowerCase().includes(search)
            );
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    const filteredCount = table.getFilteredRowModel().rows.length;
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    return (
        <main className="flex flex-col gap-7 p-4">
            {/* ── Header ────────────────────────────────────────────────────────── */}
            <section>
                <p className="text-sm font-bold tracking-[0.25em] text-green-800">
                    ÓRDENES
                </p>
                <h1 className="mt-1 font-black tracking-tight text-slate-950 text-2xl lg:text-4xl">
                    Lista de todas las órdenes
                </h1>
            </section>

            {/* ── Table section ─────────────────────────────────────────────────── */}
            <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                {isLoading ? (
                    <div className="rounded-2xl border border-neutral-200 p-8 text-neutral-500">
                        Cargando órdenes...
                    </div>
                ) : isError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-red-600">
                        Error cargando órdenes.
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
                        <ShoppingCart className="h-12 w-12 text-neutral-300" />
                        <h2 className="mt-4 text-lg font-bold text-neutral-900">
                            No hay órdenes registradas
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                            Cuando se realicen compras, aparecerán aquí.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {/* ── Search bar ──────────────────────────────────────────── */}
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Buscar por nombre, correo u orden..."
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="pl-9 rounded-xl border-neutral-200 bg-neutral-50 focus-visible:ring-neutral-300"
                            />
                        </div>

                        {/* ── Vista mobile: tarjetas (oculta en lg+) ───────────────── */}
                        <div className="flex flex-col gap-3 lg:hidden">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <OrderCard key={row.id} order={row.original} />
                                ))
                            ) : (
                                <div className="py-10 text-center text-sm text-neutral-500">
                                    No se encontraron resultados.
                                </div>
                            )}
                        </div>

                        {/* ── Vista desktop: DataTable (oculta en mobile) ──────────── */}
                        <div className="hidden lg:block w-full overflow-hidden rounded-2xl border border-neutral-200">
                            <div className="w-full overflow-x-auto">
                                <Table className="w-full table-fixed">
                                    <TableHeader className="bg-neutral-50">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="border-neutral-200">
                                                {headerGroup.headers.map((header) => (
                                                    <TableHead
                                                        key={header.id}
                                                        style={{ width: header.getSize() }}
                                                        className="text-xs font-semibold uppercase tracking-wide text-neutral-500 p-2"
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                  header.column.columnDef.header,
                                                                  header.getContext()
                                                              )}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>

                                    <TableBody>
                                        {table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    className="border-neutral-200 transition-colors hover:bg-neutral-50"
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            style={{ width: cell.column.getSize() }}
                                                            className="p-2"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={ordersTableColumns.length}
                                                    className="py-10 text-center text-neutral-500"
                                                >
                                                    No se encontraron resultados.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* ── Pagination (compartida) ───────────────────────────────── */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-sm text-neutral-500">
                            <span>
                                {filteredCount}{" "}
                                {filteredCount === 1 ? "orden encontrada" : "órdenes encontradas"}
                            </span>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="rounded-xl gap-1"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Anterior</span>
                                </Button>
                                <span className="text-xs tabular-nums">
                                    {currentPage} / {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="rounded-xl gap-1"
                                >
                                    <span className="hidden sm:inline">Siguiente</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}