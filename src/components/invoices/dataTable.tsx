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
  ReceiptText,
  Search,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
import { useInvoices } from "@/hooks/private/invoices/useInvoices";
import { invoiceColumns } from "./columns";

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


const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
  if (status === "PAID") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 whitespace-nowrap">
        <CheckCircle2 className="h-3 w-3 shrink-0" />
        Pagada
      </span>
    );
  }
  if (status === "CANCELLED") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 whitespace-nowrap">
        <XCircle className="h-3 w-3 shrink-0" />
        Fallida
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 whitespace-nowrap">
      <Clock className="h-3 w-3 shrink-0" />
      Pendiente
    </span>
  );
};

// ─── Tarjeta individual ───────────────────────────────────────────────────────
function InvoiceCard({ invoice }: { invoice: InvoiceListItem }) {
  const customer = invoice.order?.customer;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      {/* Fila superior: número de factura + estado */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-bold text-neutral-900 truncate max-w-45"
              title={invoice.invoiceNumber}
            >
              {invoice.invoiceNumber}
            </p>
            <p className="text-[10px] text-neutral-400">
              {invoice.id.slice(0, 8)}...
            </p>
          </div>
        </div>
        <StatusBadge status={invoice.status} />
      </div>

      {/* Separador */}
      <div className="h-px bg-neutral-100" />

      {/* Info en grid 2×2 */}
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
          <p className="text-neutral-400">Orden</p>
          <p className="font-medium text-neutral-800 truncate" title={invoice.order?.orderNumber ?? ""}>
            {invoice.order?.orderNumber ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-neutral-400">Fecha</p>
          <p className="font-medium text-neutral-800">{formatDate(invoice.issuedAt)}</p>
        </div>
      </div>

      {/* Fila inferior: total + acción */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm font-black text-neutral-900">
          {formatCurrency(invoice.total)}
        </p>
        <Link
          href={`/dashboard/invoices/${invoice.invoiceNumber}`}
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
export default function InvoicesDashboardPage() {
  const { data: invoices = [], isLoading, isError } = useInvoices();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((i) => i.status === "PAID").length;
  const pendingInvoices = invoices.filter((i) =>
    ["DRAFT", "ISSUED"].includes(i.status)
  ).length;
  const failedInvoices = invoices.filter((i) => i.status === "CANCELLED").length;

  // ── Table ──────────────────────────────────────────────────────────────────
  const table = useReactTable({
    data: invoices,
    columns: invoiceColumns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const customer = row.original.order?.customer;
      const orderNumber = row.original.order?.orderNumber ?? "";
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
    <main className="flex min-h-0 w-full max-w-full flex-col gap-7 overflow-x-hidden p-4">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section>
        <p className="text-sm font-bold tracking-[0.25em] text-green-800">
          FACTURAS
        </p>
        <h1 className="mt-1 text-2xl lg:text-4xl font-black tracking-tight text-slate-950">
          Lista de todas las compras registradas
        </h1>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Total facturas</p>
          <p className="mt-2 text-3xl font-black">{totalInvoices}</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Pendientes</p>
          <p className="mt-2 text-3xl font-black text-yellow-500">{pendingInvoices}</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Pagadas</p>
          <p className="mt-2 text-3xl font-black text-green-600">{paidInvoices}</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Fallidas</p>
          <p className="mt-2 text-3xl font-black text-red-500">{failedInvoices}</p>
        </div>
      </section>

      {/* ── Table section ─────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
        {isLoading ? (
          <div className="rounded-2xl border border-neutral-200 p-8 text-neutral-500">
            Cargando facturas...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-red-600">
            Error cargando facturas.
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
            <ReceiptText className="h-12 w-12 text-neutral-300" />
            <h2 className="mt-4 text-lg font-bold text-neutral-900">
              No hay facturas registradas
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Cuando se confirmen pagos, aparecerán aquí.
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
                  <InvoiceCard key={row.id} invoice={row.original} />
                ))
              ) : (
                <div className="py-10 text-center text-sm text-neutral-500">
                  No se encontraron resultados.
                </div>
              )}
            </div>

            {/* ── Vista desktop: DataTable (oculta en mobile) ──────────── */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-neutral-200">
              <div className="overflow-x-auto">
                <Table className="w-full table-fixed">
                  <TableHeader className="bg-neutral-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="border-neutral-200">
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            style={{ width: header.getSize() }}
                            className="text-xs font-semibold uppercase tracking-wide text-neutral-500 px-4 py-3"
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
                              className="px-4 py-3"
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
                          colSpan={invoiceColumns.length}
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
                {filteredCount === 1 ? "factura encontrada" : "facturas encontradas"}
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